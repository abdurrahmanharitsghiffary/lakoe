import { Prisma } from '@prisma/client';

export const selectCart = {
  createdAt: true,
  qty: true,
  updatedAt: true,
  //   productVariant:{select:{}}
} satisfies Prisma.CartSelect;
