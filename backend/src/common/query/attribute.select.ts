import { Prisma } from '@prisma/client';

export const selectSkuAttributes = {
  value: true,
} satisfies Prisma.AttributeSKUSelect;

export const selectAttributeSimplified = {
  name: true,
  skuAttributes: {
    select: selectSkuAttributes,
  },
} satisfies Prisma.AttributeSelect;
