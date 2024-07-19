import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import { productSelect } from 'src/common/query/product.select';
import { GetProductsSchema } from './schema/get-products';
import { parseStringBool } from 'src/common/utils/parse-string-bool';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    storeId: number,
    {
      categories,
      variants,
      ...dto
    }: CreateProductDto & { attachments?: string[] },
  ) {
    return this.prismaService.$transaction(async (tx) => {
      const createdProduct = await tx.product.create({
        data: {
          ...dto,
          storeId,
          variants: { createMany: { data: variants } },
          categories: {
            connectOrCreate: categories.map((category) => ({
              create: { name: category },
              where: { name: category },
            })),
          },
        },
      });

      return createdProduct;
    });
  }

  findAllByStoreId(storeId: number = -1, active: boolean = undefined) {
    return this.prismaService.product.findMany({
      where: { isActive: active, storeId },
      select: productSelect,
    });
  }

  findAll() {
    return this.prismaService.product.findMany({
      select: productSelect,
    });
  }

  async search({ q, active, categories, sort_by }: GetProductsSchema) {
    let priceSortOptions;
    let stockSortOptions;
    switch (sort_by) {
      case 'highest_price': {
        priceSortOptions = 'desc';
        break;
      }
      case 'lowest_price': {
        priceSortOptions = 'asc';
        break;
      }
      case 'highest_stock': {
        stockSortOptions = 'desc';
        break;
      }
      case 'lowest_stock': {
        stockSortOptions = 'asc';
        break;
      }
    }

    const results = await this.prismaService.product.findMany({
      where: {
        isActive: parseStringBool(active),
        categories: { some: { name: { in: categories?.split(',') } } },
        name: { contains: q, mode: 'insensitive' },
      },
      select: {
        ...productSelect,
        variants: {
          select: { ...productSelect.variants.select },
          orderBy: [{ price: { sort: 'desc' } }],
        },
      },
    });

    const sortedResults = results.slice();

    if (['highest_stock', 'lowest_stock'].includes(sort_by)) {
      return sortedResults.sort((a, b) => {
        const totalStockA = a.variants.reduce(
          (prev, { stock }) => prev + stock,
          0,
        );
        const totalStockB = b.variants.reduce(
          (prev, { stock }) => prev + stock,
          0,
        );

        if (stockSortOptions === 'asc') return totalStockA - totalStockB;
        return totalStockB - totalStockA;
      });
    }

    return sortedResults.sort((a, b) => {
      if (priceSortOptions === 'desc')
        return +b?.variants?.[0]?.price - +a?.variants?.[0]?.price;
      return +a?.variants?.[0]?.price - +b?.variants?.[0]?.price;
    });
  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      select: productSelect,
    });
    if (!product) throw new NotFoundException('Product not found.');
    return product;
  }

  async update(id: number, { categories, ...dto }: UpdateProductDto) {
    const updatedProducts = await this.prismaService.product.update({
      where: { id },
      data: {
        storeId: 1,
        ...dto,
        categories: {
          connectOrCreate: categories.map((category) => ({
            create: { name: category },
            where: { name: category },
          })),
        },
      },
      select: productSelect,
    });

    return updatedProducts;
  }

  async remove(id: number) {
    return await this.prismaService.product.delete({
      where: { id },
      select: productSelect,
    });
  }
}
