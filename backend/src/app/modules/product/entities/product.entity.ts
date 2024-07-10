import { Prisma } from '@prisma/client';

export class Product {}

// Prisma select query for variants and products

export const variantSelect = {
  name: true,
  id: true,
  createdAt: true,
  updatedAt: true,
  image: true,
  isActive: true,
  price: true,
  sku: true,
  stock: true,
  weightInGram: true,
} satisfies Prisma.VariantSelect;

export type VariantSelectPayload = Prisma.VariantGetPayload<{
  select: typeof variantSelect;
}>;

export const productSelect = {
  id: true,
  attachments: true,
  categories: { select: { name: true } },
  description: true,
  isActive: true,
  minimumOrder: true,
  name: true,
  variants: {
    select: variantSelect,
  },
} satisfies Prisma.ProductSelect;

export type ProductSelectPayload = Prisma.ProductGetPayload<{
  select: typeof productSelect;
}>;
