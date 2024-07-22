import {
  BadRequestException,
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
import { AddCourierDto } from './dto/add-courier.dto';
import { GetShippingRateOptions } from 'src/common/types/biteship';
import { ERR } from 'src/common/constants';

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

  findOne(id: number) {
    return this.checkStoreMustExists(id);
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
    await this.checkStoreMustExists(id);
    return this.prismaService.store.update({
      data: updateStoreDto,
      where: { id },
      select: selectStore,
    });
  }

  async getShippingRates(
    id: number,
    destAddress: CreateInvoiceDto,
    skusDto: { id: number; qty: number }[],
  ) {
    await this.checkStoreMustExists(id);
    const store = await this.prismaService.store.findUnique({
      where: { id },
      select: { addresses: { orderBy: { isMainLocation: 'desc' }, take: 1 } },
    });

    console.log(store, 'STORE');

    const skus = await this.prismaService.sKU.findMany({
      where: {
        id: { in: skusDto.map((product) => product.id) },
        AND: [{ product: { storeId: id } }],
      },
      include: { product: { select: { description: true, name: true } } },
    });

    const availableCouriers = await this.prismaService.courierService.findMany({
      where: {
        storeId: id,
      },
    });

    console.log(availableCouriers, 'Available couriers');

    const couriersCode = availableCouriers.map(
      (courier) => courier.courierCode,
    );

    if (couriersCode.length === 0)
      throw new BadRequestException(ERR.STORE_COURIER_NOT_FOUND);

    const storeAddress = store?.addresses?.[0];
    if (!storeAddress)
      throw new BadRequestException(ERR.UNABLE_CALCULATE_SHIPPING_RATE);

    const destAreaIdResponse = await this.biteshipService.getAreaID({
      countries: 'ID',
      input: destAddress.receiverDistrict,
      type: 'single',
    });

    const destAreaId = destAreaIdResponse?.areas?.[0]?.id;

    const originAreaIdResponse = await this.biteshipService.getAreaID({
      countries: 'ID',
      input: storeAddress.district,
      type: 'single',
    });

    const originAreaId = originAreaIdResponse?.areas?.[0]?.id;
    console.log(destAreaIdResponse, 'DEST AREA ID RES');
    console.log(originAreaIdResponse, 'ORIGIN AREA ID RES');

    const options: GetShippingRateOptions = {
      couriers: couriersCode as any,
      items: skus.map((sku) => ({
        name: sku.product.name,
        sku: sku.sku,
        quantity: skusDto.find((product) => product.id === sku.id).qty,
        value: +sku.price,
        weight: sku.weightInGram,
        description: sku.product.description,
      })),
      destination_postal_code: +destAddress?.receiverPostalCode,
      origin_postal_code: +storeAddress?.postalCode,
      destination_latitude: +destAddress?.receiverLatitude,
      destination_longitude: +destAddress?.receiverLongitude,
      origin_latitude: +storeAddress?.latitude,
      origin_longitude: +storeAddress?.longitude,
    };

    if (destAreaId) options.destination_area_id = destAreaId;
    if (originAreaId) options.origin_area_id = originAreaId;

    const response = await this.biteshipService.getShippingRates(options);

    return response?.pricing;
  }

  async remove(id: number) {
    await this.checkStoreMustExists(id);
    return this.prismaService.store.delete({
      where: { id },
      select: selectStore,
    });
  }

  async findAllCourierServices(storeId: number, skipStoreCheck?: boolean) {
    if (!skipStoreCheck) await this.checkStoreMustExists(storeId);
    return await this.prismaService.courierService.findMany({
      where: { storeId },
    });
  }

  async checkCouriersMustExists(storeId: number) {
    const courierServices = await this.findAllCourierServices(storeId, true);
    if (courierServices.length === 0)
      throw new BadRequestException(ERR.STORE_COURIER_NOT_FOUND);
    return courierServices;
  }

  async addCourierService(
    storeId: number,
    addCourierDto: AddCourierDto,
    skipStoreCheck?: boolean,
  ) {
    if (!skipStoreCheck) await this.checkStoreMustExists(storeId);
    return await this.prismaService.courierService.createMany({
      data: addCourierDto.courierServices.map((service) => ({
        ...service,
        storeId,
      })),
      skipDuplicates: true,
    });
  }

  async removeCourierService(storeId: number, courierServiceIds: number[]) {
    await this.checkStoreMustExists(storeId);
    return await this.prismaService.courierService.deleteMany({
      where: { id: { in: courierServiceIds } },
    });
  }

  async checkStoreMustExists(storeId: number) {
    const store = await this.prismaService.store.findUnique({
      where: { id: storeId },
      select: selectStore,
    });
    if (!store) throw new NotFoundException('Store is not found.');
    return store;
  }
}
