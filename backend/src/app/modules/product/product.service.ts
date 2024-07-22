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

  async create(
    storeId: number,
    { categories, skus, ...dto }: CreateProductDto & { attachments?: string[] },
  ) {
    return await this.prismaService.$transaction(async (tx) => {
      const createdProduct = await tx.product.create({
        data: {
          ...dto,
          storeId,
          categories: {
            connectOrCreate: categories.map((category) => ({
              create: { name: category },
              where: { name: category },
            })),
          },
        },
      });
      console.log(skus, 'SKUS');
      await Promise.all(
        skus.map(async ({ skuAttribute, ...sku }) => {
          const createdSku = await tx.sKU.create({
            data: {
              ...sku,
              productId: createdProduct.id,
              sku: dto.name + Date.now().toString().slice(-3),
            },
          });
          await Promise.all(
            skuAttribute.map(async (attribute) => {
              console.log(attribute, 'Attribute');
              const createdAttribute = await tx.attribute.upsert({
                create: {
                  name: attribute.attributeName,
                  productId: createdProduct.id,
                },
                where: {
                  productId_name: {
                    name: attribute.attributeName,
                    productId: createdProduct.id,
                  },
                },
                update: {},
              });
              console.log(createdAttribute, 'Created Attr');
              const attributeSku = await tx.attributeSKU.create({
                data: {
                  value: attribute.value,
                  attributeId: createdAttribute.id,
                  skuId: createdSku.id,
                },
              });
              console.log(attributeSku, 'Attr Sku');
            }),
          );
        }),
      );

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
        OR: [
          {
            name: { contains: q, mode: 'insensitive' },
          },
          { skus: { some: { sku: { contains: q, mode: 'insensitive' } } } },
        ],
      },
      select: {
        ...productSelect,
        skus: {
          select: { ...productSelect.skus.select },
          orderBy: [{ price: 'desc' }],
        },
      },
    });

    const sortedResults = results.slice();

    if (['highest_stock', 'lowest_stock'].includes(sort_by)) {
      return sortedResults.sort((a, b) => {
        const totalStockA = a.skus.reduce((prev, { stock }) => prev + stock, 0);
        const totalStockB = b.skus.reduce((prev, { stock }) => prev + stock, 0);

        if (stockSortOptions === 'asc') return totalStockA - totalStockB;
        return totalStockB - totalStockA;
      });
    }

    return sortedResults.sort((a, b) => {
      if (priceSortOptions === 'desc')
        return +b?.skus?.[0]?.price - +a?.skus?.[0]?.price;
      return +a?.skus?.[0]?.price - +b?.skus?.[0]?.price;
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
