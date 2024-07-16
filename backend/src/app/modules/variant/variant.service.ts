import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class VariantService {
  constructor(private readonly prismaService: PrismaService) {}

  createMany(createVariantDto: CreateVariantDto) {
    return this.prismaService.variant.createMany({
      data: createVariantDto.variants.map((variant) => ({
        ...variant,
        productId: createVariantDto.productId,
      })),
    });
  }

  findAll(productId: number) {
    return this.prismaService.variant.findMany({
      where: { productId },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });
  }

  async findOne(id: number) {
    const variant = await this.prismaService.variant.findUnique({
      where: { id },
    });
    if (!variant) throw new NotFoundException('Product variant not found.');
    return variant;
  }

  async update(id: number, updateVariantDto: UpdateVariantDto) {
    await this.findOne(id);
    return this.prismaService.variant.update({
      where: { id },
      data: updateVariantDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.variant.delete({ where: { id } });
  }
}
