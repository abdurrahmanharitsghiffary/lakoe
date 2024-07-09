import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const { variants, categories, ...productData } = createProductDto;
    return await this.prisma.product.create({
      data: {
        ...productData,
        attachments: productData.attachments || [],
        categories: {
          create: categories,
        },
        variants: {
          create: variants,
        },
      },
    });
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
