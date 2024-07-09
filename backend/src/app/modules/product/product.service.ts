import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  create({ price, stock, weightInGram, categories, ...dto }: CreateProductDto) {
    return this.prismaService.$transaction(async (tx) => {
      const createdProduct = await tx.product.create({
        data: {
          storeId: 1,
          ...dto,
          variants: {
            create: { name: dto.name, price, stock, weightInGram },
          },
          categories: {
            connectOrCreate: [{ create: { name: 'lol' }, where: { id: 1 } }],
          },
        },
      });
    });
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  findOne(id: number) {
    return this.prismaService.product.findUnique({ where: { id } });
  }

  update(
    id: number,
    { price, stock, weight, categories, ...dto }: UpdateProductDto,
  ) {
    return this.prismaService.product.update({
      data: { ...dto },
      where: { id },
    });
  }

  remove(id: number) {
    return this.prismaService.product.delete({
      where: { id },
    });
  }
}
