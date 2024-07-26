import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  selectCart,
  selectCartCollection,
  selectCartItems,
} from '@/common/query/cart.select';
import { PrismaService } from '@/common/services/prisma.service';
import { AddCartItemDto } from './dto/cart.dto';
import { ERROR_CODE } from '@/common/constants';
import { selectSKU } from '@/common/query/sku.select';
import { ApiErrorResponse } from '@/common/class/api-response';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  async checkCartMustExist(cartId: string) {
    const cart = await this.prismaService.cart.findUnique({
      where: {
        id: cartId,
      },
      select: selectCart,
    });
    if (!cart) throw new NotFoundException('Cart is not found.');
    return cart;
  }

  async checkSkuMustExists(skuId: number) {
    const sku = await this.prismaService.sKU.findUnique({
      where: { id: skuId },
      select: { ...selectSKU, product: { select: { storeId: true } } },
    });
    if (!sku) throw new NotFoundException('SKU is not found.');
    return sku;
  }

  async checkCartItemMustExists(cartId: string, skuId: number) {
    const cartItem = await this.prismaService.cartItem.findUnique({
      where: { cartId_skuId: { cartId, skuId } },
    });
    if (!cartItem) throw new NotFoundException('Cart item is not found.');
    return cartItem;
  }

  async checkCartCollectionMustExists(collectionId: string) {
    const cartCollection = await this.prismaService.cartCollection.findUnique({
      where: { id: collectionId },
      select: selectCartCollection,
    });
    if (!cartCollection)
      throw new NotFoundException('Cart collection is not found.');
    return cartCollection;
  }

  async ensureCartIsUnique(collectionId: string, storeId: number) {
    await this.checkStoreMustExists(storeId);
    await this.checkCartCollectionMustExists(collectionId);

    const cart = await this.prismaService.cart.findUnique({
      where: {
        storeId_cartCollectionId: { cartCollectionId: collectionId, storeId },
      },
    });
    console.log(cart);
    if (cart)
      throw new ConflictException(
        `A cart with storeId ${cart.storeId} already exists in the collection.`,
      );
    return cart;
  }

  async checkStoreMustExists(storeId: number) {
    const store = await this.prismaService.store.findUnique({
      where: { id: storeId },
    });
    if (!store) throw new NotFoundException('Store is not found.');
    return store;
  }

  async findAllItemsByCartId(cartId: string) {
    await this.checkCartMustExist(cartId);
    return await this.prismaService.cartItem.findMany({
      where: { cartId },
      select: selectCartItems,
    });
  }

  findOneCart(cartId: string) {
    return this.checkCartMustExist(cartId);
  }

  findOneCartCollection(collectionId: string) {
    return this.checkCartCollectionMustExists(collectionId);
  }

  // async createCart(createCartDto: CreateCartDto, skipUniqueCheck?: boolean) {
  //   if (!skipUniqueCheck)
  //     await this.ensureCartIsUnique(
  //       createCartDto.collectionId,
  //       createCartDto.storeId,
  //     );

  //   if (createCartDto?.skus)
  //     await this.validateSkus(createCartDto as any);

  //   const cart = await this.prismaService.cart.create({
  //     data: {
  //       cartCollectionId: createCartDto.collectionId,
  //       storeId: createCartDto.storeId,
  //     },
  //   });

  //   if (createCartDto?.skus)
  //     await this.addCartItems(
  //       createCartDto.collectionId,
  //       createCartDto as any,
  //       true,
  //     );
  //   return cart;
  // }

  async createCartCollection() {
    const cartCollection = await this.prismaService.cartCollection.create({
      data: {},
    });

    return {
      cartCollectionId: cartCollection.id,
    };
  }

  async updateCartCountOrDelete(
    cartId: string,
    skuId: number,
    count: number,
    replaceCount?: boolean,
  ) {
    const cart = await this.checkCartMustExist(cartId);
    const sku = await this.checkSkuMustExists(skuId);

    if (sku.product.storeId !== cart.store.id)
      throw new BadRequestException(
        new ApiErrorResponse([
          {
            message: 'Cannot add SKU from a different store.',
            skuId: sku.id,
            skuStoreId: sku.product.storeId,
            cartStoreId: cart.store.id,
            code: ERROR_CODE.FORBIDDEN,
          },
        ]),
      );

    const cartItem = await this.prismaService.cartItem.upsert({
      where: { cartId_skuId: { cartId, skuId } },
      create: { qty: count, cartId, skuId },
      update: { qty: replaceCount ? count : { increment: count } },
      select: { qty: true },
    });
    if (cartItem.qty < 1) {
      await this.prismaService.cartItem.delete({
        where: { cartId_skuId: { cartId, skuId } },
      });
    }
    return cartItem;
  }

  decrement(cartId: string, skuId: number) {
    return this.updateCartCountOrDelete(cartId, skuId, -1);
  }

  increment(cartId: string, skuId: number) {
    return this.updateCartCountOrDelete(cartId, skuId, 1);
  }

  async validateSkus(addCartItemDto: AddCartItemDto) {
    const errors = [];

    const skuIds = (addCartItemDto?.skus ?? []).map((sku) => sku.skuId);

    const skus = await this.prismaService.sKU.findMany({
      where: { id: { in: skuIds } },
      select: {
        isActive: true,
        stock: true,
        product: { select: { isActive: true, storeId: true, id: true } },
        id: true,
      },
    });

    addCartItemDto.skus.forEach((sk) => {
      const sku = skus.find((sku) => sku.id === sk.skuId);

      if (!sku)
        return errors.push({
          message: 'SKU is not found.',
          skuId: sk.skuId,
          code: ERROR_CODE.NOT_FOUND,
        });
      console.log(sku, sk.qty);
      if (sku.stock < sk.qty) {
        errors.push({
          message: 'Insufficient stock.',
          requestedStock: sk.qty,
          skuStock: sku.stock,
          code: ERROR_CODE.INSUFFICIENT_STOCK,
        });
      }

      // if (!sku.isActive) {
      //   errors.push({
      //     message: 'SKU is inactive.',
      //     code: ERROR_CODE.INACTIVE,
      //     skuId: sku.id,
      //   });
      // }

      // if (!sku.product.isActive) {
      //   errors.push({
      //     message: 'Product sku is inactive.',
      //     code: ERROR_CODE.INACTIVE,
      //     skuId: sku.id,
      //     productId: sku.product.id,
      //   });
      // }
    });

    if (errors.length > 0)
      throw new BadRequestException({
        errors,
        message: 'Failed to add items to the cart',
      });

    return skus;
  }

  async addCartItems(collectionId: string, addCartItemDto: AddCartItemDto) {
    await this.validateSkus(addCartItemDto);
    addCartItemDto.skus.map(async (sk) => {
      const sku = await this.prismaService.sKU.findUnique({
        where: { id: sk.skuId },
        select: {
          product: { select: { storeId: true } },
          cartItems: { select: { cartId: true } },
        },
      });

      const storeId = sku?.product?.storeId || -1;
      const cart = await this.prismaService.cart.findUnique({
        where: {
          storeId_cartCollectionId: {
            storeId,
            cartCollectionId: collectionId,
          },
        },
      });

      const cartId = cart?.id || '';

      return await this.prismaService.cart.upsert({
        where: {
          storeId_cartCollectionId: {
            cartCollectionId: collectionId,
            storeId,
          },
        },
        create: {
          storeId,
          cartCollectionId: collectionId,
          cartItems: {
            create: { qty: sk.qty, skuId: sk.skuId },
          },
        },
        update: {
          cartItems: {
            upsert: {
              create: { qty: sk.qty, skuId: sk.skuId },
              update: { qty: sk.qty },
              where: {
                cartId_skuId: {
                  skuId: sk.skuId,
                  cartId,
                },
              },
            },
          },
        },
      });
    });
  }

  async removeCartCollection(collectionId: string) {
    await this.checkCartCollectionMustExists(collectionId);
    await this.prismaService.cartCollection.delete({
      where: { id: collectionId },
    });
  }

  async removeCart(cartId: string) {
    await this.checkCartMustExist(cartId);
    await this.prismaService.cart.delete({ where: { id: cartId } });
  }

  async deleteSku(cartId: string, skuId: number): Promise<void> {
    await this.checkCartItemMustExists(cartId, skuId);

    // if (!cart) {
    //   throw new NotFoundException(`Cart with id ${cartId} not found`);
    // }

    // // Check if the SKU exists in the cart
    // const cartItem = cart.cartItems.find((item) => item.skuId === skuId);
    // if (!cartItem) {
    //   throw new NotFoundException(`SKU with id ${skuId} not found in cart`);
    // }

    // Delete the SKU from the cart
    await this.prismaService.cartItem.delete({
      where: {
        cartId_skuId: {
          cartId: cartId,
          skuId: skuId,
        },
      },
    });
  }
}
