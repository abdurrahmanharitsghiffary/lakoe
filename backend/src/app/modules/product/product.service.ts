import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import {
  selectProduct,
  selectProductSimplified,
} from 'src/common/query/product.select';
import { GetProductOption } from './schema/get-products.dto';
import { parseStringBool } from 'src/common/utils/parse-string-bool';
import { genSku } from 'src/common/utils/gen-sku';
import { omitProperties } from 'src/common/utils/omit-properties';
import { CreateProductDto } from './dto/create-product.dto';
import { emptyArrayAndUndefined } from 'src/common/utils/empty-array-and-undefined';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    storeId: number,
    { categories, skus, ...dto }: CreateProductDto & { images?: string[] },
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
              sku: genSku(dto.name),
            },
          });
          if (skuAttribute?.length > 0)
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
      select: selectProductSimplified,
    });
  }

  async search({
    q,
    active,
    categories,
    sort_by,
    storeId,
  }: GetProductOption & { storeId?: number }) {
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
        storeId: storeId || undefined,
        isActive: parseStringBool(active),
        categories: {
          some: {
            name: {
              in: emptyArrayAndUndefined(categories?.split(',')),
              mode: 'insensitive',
            },
          },
        },
        OR: [
          {
            name: { contains: q || undefined, mode: 'insensitive' },
          },
          {
            skus: {
              some: { sku: { contains: q || undefined, mode: 'insensitive' } },
            },
          },
          { description: { contains: q || undefined } },
        ],
      },
      select: {
        ...selectProductSimplified,
        skus: {
          select: { stock: true, price: true },
          orderBy: [{ price: 'desc' }],
        },
        store: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    const sortedResults = results.slice();

    if (['highest_stock', 'lowest_stock'].includes(sort_by)) {
      return sortedResults
        .sort((a, b) => {
          const totalStockA = a.skus.reduce(
            (prev, { stock }) => prev + stock,
            0,
          );
          const totalStockB = b.skus.reduce(
            (prev, { stock }) => prev + stock,
            0,
          );

          if (stockSortOptions === 'asc') return totalStockA - totalStockB;
          return totalStockB - totalStockA;
        })
        .map((product) => omitProperties(product, ['skus']));
    }

    return sortedResults
      .sort((a, b) => {
        if (priceSortOptions === 'desc')
          return +b?.skus?.[0]?.price - +a?.skus?.[0]?.price;
        return +a?.skus?.[0]?.price - +b?.skus?.[0]?.price;
      })
      .map((product) => omitProperties(product, ['skus']));
  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      select: selectProduct,
    });
    if (!product) throw new NotFoundException('Product is not found.');
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
      select: selectProduct,
    });

    return updatedProducts;
  }

  async remove(id: number) {
    return await this.prismaService.product.delete({
      where: { id },
      select: selectProduct,
    });
  }
}

// given attribute like this
