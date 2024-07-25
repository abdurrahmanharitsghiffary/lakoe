import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import { genSku } from 'src/common/utils/gen-sku';
import { selectSKU } from 'src/common/query/sku.select';

@Injectable()
export class SkuService {
  constructor(private readonly prismaService: PrismaService) {}

  create(productId: number, { skuAttribute, ...sku }: CreateSkuDto) {
    return this.prismaService.$transaction(async (tx) => {
      const product = await this.prismaService.product.findUnique({
        where: { id: productId },
      });

      if (!product) throw new NotFoundException('Product is not found.');

      const createdSku = await tx.sKU.create({
        data: {
          ...sku,
          productId,
          sku: genSku(product.name),
        },
      });
      await Promise.all(
        skuAttribute.map(async (attribute) => {
          console.log(attribute, 'Attribute');
          const createdAttribute = await tx.attribute.upsert({
            create: {
              name: attribute.attributeName,
              productId,
            },
            where: {
              productId_name: {
                name: attribute.attributeName,
                productId,
              },
            },
            update: {},
          });

          await tx.attributeSKU.create({
            data: {
              value: attribute.value,
              attributeId: createdAttribute.id,
              skuId: createdSku.id,
            },
          });
          return createdSku;
        }),
      );
    });
  }

  findAll() {
    return this.prismaService.sKU.findMany({
      select: selectSKU,
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });
  }

  findOne(skuId: number) {
    return this.prismaService.sKU.findUnique({
      where: { id: skuId },
      select: selectSKU,
    });
  }

  update(skuId: number, updateSkuDto: UpdateSkuDto) {
    return this.prismaService.sKU.update({
      where: { id: skuId },
      data: updateSkuDto,
    });
  }

  findAllByStoreId(storeId: number) {
    return this.prismaService.sKU.findMany({
      where: { product: { storeId } },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      select: selectSKU,
    });
  }

  findAllByProductId(productId: number) {
    return this.prismaService.sKU.findMany({
      where: { product: { id: productId } },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      select: selectSKU,
    });
  }

  remove(skuId: number) {
    return this.prismaService.sKU.delete({ where: { id: skuId } });
  }
}
