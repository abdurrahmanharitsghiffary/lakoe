import { Prisma } from '@prisma/client';

export const selectSKUAttributes = {
  value: true,
  attribute: { select: { name: true } },
} satisfies Prisma.AttributeSKUSelect;

export type SelectAttributesSKUPayload = Prisma.AttributeSKUGetPayload<{
  select: typeof selectSKUAttributes;
}>;

export const selectSKU = {
  sku: true,
  product: {
    select: { name: true, isActive: true },
  },
  discount: true,
  createdAt: true,
  updatedAt: true,
  id: true,
  discountType: true,
  isActive: true,
  image: true,
  price: true,
  stock: true,
  weightInGram: true,
  skuAttributes: {
    select: selectSKUAttributes,
  },
} satisfies Prisma.SKUSelect;

export type SelectSKUPayload = Prisma.SKUGetPayload<{
  select: typeof selectSKU;
}>;
