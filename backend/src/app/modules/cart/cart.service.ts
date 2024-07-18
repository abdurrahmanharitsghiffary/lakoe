import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  create(userId: number, createCartDto: CreateCartDto) {
    return this.prismaService.cart.create({
      data: {
        qty: createCartDto.qty,
        userId,
        productVariantId: createCartDto.variantId,
      },
    });
  }

  findAllByUserId(userId: number) {
    return this.prismaService.cart.findMany({ where: { userId } });
  }

  updateQty(userId: number, variantId: number, qty: number) {
    return this.prismaService.cart.update({
      data: { qty: { increment: qty } },
      where: {
        userId_productVariantId: { productVariantId: variantId, userId },
      },
    });
  }

  async decrement(userId: number, variantId: number) {
    await this.updateQty(userId, variantId, -1);
  }

  async increment(userId: number, variantId: number) {
    await this.updateQty(userId, variantId, 1);
  }

  remove(userId: number, variantId: number) {
    return this.prismaService.cart.delete({
      where: {
        userId_productVariantId: { productVariantId: variantId, userId },
      },
    });
  }
}
