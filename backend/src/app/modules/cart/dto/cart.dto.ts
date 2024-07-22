import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

class CartSku {
  skuId: number = 1;
  qty: number = 12;
}

export class AddCartItemDto {
  storeId: number;
  skus: CartSku[] = [
    {
      skuId: 1,
      qty: 40,
    },
    {
      skuId: 2,
      qty: 12,
    },
    {
      skuId: 9999,
      qty: 100,
    },
    {
      skuId: 99,
      qty: 12,
    },
  ];
}

export const skuSchema = z.object({
  skuId: z.number().min(1).positive(),
  qty: z.number().min(1).positive(),
});

export const addCartItemSchema = z.object({
  storeId: z.number().min(1).positive(),
  skus: z.array(skuSchema).max(5),
});

export type AddCartItemSchema = z.infer<typeof addCartItemSchema>;

export class CreateCartDto {
  collectionId: string = '29c5cf7a-3b1d-4129-8ea8-4e099f9fd14a';
  storeId: number = 1;
  @ApiProperty({ type: () => [CartSku] })
  skus?: CartSku[] = [
    {
      skuId: 1,
      qty: 40,
    },
    {
      skuId: 2,
      qty: 12,
    },
    {
      skuId: 9999,
      qty: 100,
    },
    {
      skuId: 99,
      qty: 12,
    },
  ];
}

export const createCartSchema = z.object({
  collectionId: z.string().uuid(),
  storeId: z.number().min(1).positive(),
  skus: z.array(skuSchema).max(5).optional(),
});

export class UpdateCartCountDto {
  count: number;
}

export const updateCartCountSchema = z.object({
  count: z.number().min(1).positive(),
});
