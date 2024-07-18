import { Prisma } from '@prisma/client';

export const selectVariant = {
  name: true,
  id: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
  price: true,
  sku: true,
  stock: true,
  weightInGram: true,
} satisfies Prisma.VariantSelect;

export type VariantSelectPayload = Prisma.VariantGetPayload<{
  select: typeof selectVariant;
}>;
