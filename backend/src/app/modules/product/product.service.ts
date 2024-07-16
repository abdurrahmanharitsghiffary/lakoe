import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import { productSelect } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    storeId: number,
    {
      // price,
      // stock,
      // weightInGram,
      categories,
      ...dto
    }: CreateProductDto & { attachments?: string[] },
  ) {
    return this.prismaService.$transaction(async (tx) => {
      // create the product with variants
      // product will have only one variant with name the same as product
      // also connect relationship with categories if they are found or create of not found
      const createdProduct = await tx.product.create({
        data: {
          ...dto,
          storeId,
          // variants: {
          //   create: {
          //     name: dto.name,
          //     price,
          //     stock,
          //     weightInGram,
          //     // generate the SKU
          //     sku: genSku(dto.name, dto.name, weightInGram),
          //   },
          // },
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

  findAll(active: boolean = undefined) {
    console.log(active, 'Is ACtive');
    // select all product with isActive the same as active
    return this.prismaService.product.findMany({
      where: { isActive: active },
      select: productSelect,
    });
  }

  search(q: string, isActive: boolean) {
    return this.prismaService.product.findMany({
      where: { isActive, name: { contains: q, mode: 'insensitive' } },
      select: productSelect,
    });
  }

  async findOne(id: number) {
    // Get product bt id and if not found throw Exception
    const product = await this.prismaService.product.findUnique({
      where: { id },
      select: productSelect,
    });
    if (!product) throw new NotFoundException('Product not found.');
    return product;
  }

  async update(id: number, { categories, ...dto }: UpdateProductDto) {
    // find first the product if not found it will throw Exception
    await this.findOne(id);
    // update using transation
    return await this.prismaService.$transaction(async (tx) => {
      // update the product and connect or create the categories
      const updatedProducts = await tx.product.update({
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
      });

      // find variant with name same as the product
      // const variant = await tx.product.findFirst({
      //   where: { name: dto.name },
      // });

      // update it if there are price, stock, or weight
      // await tx.variant.update({
      //   data: { price, stock, weightInGram },
      //   where: { id: variant.id },
      // });

      return updatedProducts;
    });
  }

  async remove(id: number) {
    // find first the product if not found it will throw Exception
    await this.findOne(id);
    // delete the product
    return await this.prismaService.product.delete({
      where: { id },
    });
  }
}
