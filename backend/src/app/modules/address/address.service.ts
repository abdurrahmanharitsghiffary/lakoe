import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  create(storeId: number, createAddressDto: CreateAddressDto) {
    return this.prismaService.address.create({
      data: { storeId, ...createAddressDto },
    });
  }

  findAllByStoreId(storeId: number) {
    return this.prismaService.address.findMany({ where: { storeId } });
  }

  async findOne(id: number) {
    const address = await this.prismaService.address.findUnique({
      where: { id },
    });
    if (!address) throw new NotFoundException('Address not found.');
    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    return this.prismaService.address.update({
      data: updateAddressDto,
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prismaService.address.delete({ where: { id } });
  }
}
