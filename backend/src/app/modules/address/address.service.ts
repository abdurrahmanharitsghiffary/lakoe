import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '@/common/services/prisma.service';
import { selectAddress } from '@/common/query/address.select';
import { ERR } from '@/common/constants';

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  create(storeId: number, createAddressDto: CreateAddressDto) {
    return this.prismaService.address.create({
      data: { storeId, ...createAddressDto },
      select: selectAddress,
    });
  }

  async checkAddressMustExists(storeId: number) {
    const addresses = await this.findAllByStoreId(storeId);

    if (addresses.length === 0)
      throw new BadRequestException(ERR.UNABLE_CALCULATE_SHIPPING_RATE);

    return addresses?.[0];
  }

  findAllByStoreId(storeId: number) {
    return this.prismaService.address.findMany({
      where: { storeId },
      select: selectAddress,
      orderBy: [
        { isMainLocation: 'desc' },
        { createdAt: 'desc' },
        { id: 'desc' },
      ],
    });
  }

  async findOne(id: number) {
    const address = await this.prismaService.address.findUnique({
      where: { id },
      select: selectAddress,
    });
    if (!address) throw new NotFoundException('Address not found.');
    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    return this.prismaService.address.update({
      data: updateAddressDto,
      where: { id },
      select: selectAddress,
    });
  }

  async remove(id: number) {
    return this.prismaService.address.delete({
      where: { id },
      select: selectAddress,
    });
  }
}
