import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import {
  selectStore,
  selectStoreSimplified,
} from 'src/common/query/store.select';
import { BiteshipService } from 'src/common/modules/biteship/biteship.service';
import { CreateInvoiceDto } from '../order/dto/create-order.dto';

@Injectable()
export class StoreService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly biteshipService: BiteshipService,
  ) {}

  async create(
    userId: number,
    createStoreDto: CreateStoreDto & {
      bannerAttachment?: string;
      logoAttachment?: string;
    },
  ) {
    const store = await this.prismaService.store.count({ where: { userId } });
    if (store > 0) throw new ConflictException('Store already created.');

    return this.prismaService.store.create({
      data: {
        userId,
        domain: `${createStoreDto.name.replaceAll(' ', '-').toLowerCase()}-${Date.now().toString().slice(-3)}`,
        ...createStoreDto,
      },
    });
  }

  findAll() {
    return this.prismaService.store.findMany({
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      select: selectStoreSimplified,
    });
  }

  async findOne(id: number) {
    const store = await this.prismaService.store.findUnique({
      where: { id },
      select: selectStore,
    });
    if (!store) throw new NotFoundException('Store not found.');
    return store;
  }

  async findOneByUserId(id: number) {
    const store = await this.prismaService.store.findUnique({
      where: { userId: id },
      select: selectStore,
    });
    if (!store) throw new NotFoundException('Store not found.');
    return store;
  }

  async update(
    id: number,
    updateStoreDto: UpdateStoreDto & {
      logoAttachment?: string;
      bannerAttachment?: string;
    },
  ) {
    return this.prismaService.store.update({
      data: updateStoreDto,
      where: { id },
      select: selectStore,
    });
  }

  async getShippingRates(
    id: number,
    destAddress: CreateInvoiceDto,
    products: { id: number; qty: number }[],
  ) {
    const store = await this.prismaService.store.findUnique({
      where: { id },
      select: { addresses: { orderBy: { isMainLocation: 'desc' }, take: 1 } },
    });

    const variants = await this.prismaService.variant.findMany({
      where: {
        id: { in: products.map((product) => product.id) },
        AND: [{ product: { storeId: id } }],
      },
      include: { product: { select: { description: true } } },
    });

    const availableCouriers = await this.prismaService.courierService.findMany({
      where: {
        storeId: id,
      },
    });

    const couriersCode = availableCouriers.map(
      (courier) => courier.courierCode,
    );

    const storeAddress = store?.addresses?.[0];

    const response = await this.biteshipService.getShippingRates({
      couriers: couriersCode as any,
      items: variants.map((variant) => ({
        name: variant.name,
        quantity: products.find((product) => product.id === variant.id).qty,
        value: +variant.price,
        weight: variant.weightInGram,
        description: variant.product.description,
      })),
      destination_postal_code: +destAddress?.receiverPostalCode,
      origin_postal_code: +storeAddress?.postalCode,
      destination_latitude: +destAddress?.receiverLatitude,
      destination_longitude: +destAddress?.receiverLongitude,
      origin_latitude: +storeAddress?.latitude,
      origin_longitude: +storeAddress?.longitude,
    });

    return response?.pricing;
  }

  async remove(id: number) {
    return this.prismaService.store.delete({
      where: { id },
      select: selectStore,
    });
  }
}
