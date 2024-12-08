import { Prisma } from '@prisma/client';
import { selectSKU } from './sku.select';
import { selectStoreSimplified } from './store.select';

export const selectCartItems = {
  qty: true,
  updatedAt: true,
  createdAt: true,
  sku: {
    select: selectSKU,
  },
} satisfies Prisma.CartItemSelect;

export type SelectCartItemsPayload = Prisma.CartItemGetPayload<{
  select: typeof selectCartItems;
}>;

// export const selectCartSimplified = {

// } satisfies

// export const selectCartCollectionSimplified = {
//   id: true,
//   carts: { select: selectCart },
//   createdAt: true,
//   updatedAt: true,
//   _count: { select: { carts: true } },
// } satisfies Prisma.CartCollectionSelect

export const selectCart = {
  id: true,
  cartItems: {
    select: selectCartItems,
  },
  store: {
    select: selectStoreSimplified,
  },
  _count: { select: { cartItems: true } },
} satisfies Prisma.CartSelect;

export type SelectCartPayload = Prisma.CartGetPayload<{
  select: typeof selectCart;
}>;

export const selectCartCollection = {
  id: true,
  carts: { select: selectCart },
  createdAt: true,
  updatedAt: true,
  _count: { select: { carts: true } },
} satisfies Prisma.CartCollectionSelect;

export type SelectCartCollectionPayload = Prisma.CartCollectionGetPayload<{
  select: typeof selectCartCollection;
}>;
