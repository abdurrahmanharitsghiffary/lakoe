import { Prisma } from '@prisma/client';
import { selectSKU } from './sku.select';

export const productSelectSimplified = {
  id: true,
  images: true,
  categories: { select: { name: true } },
  description: true,
  isActive: true,
  minimumOrder: true,
  name: true,
  _count: { select: { skus: true } },
} satisfies Prisma.ProductSelect;

export const productSelect = {
  ...productSelectSimplified,
  skus: {
    select: selectSKU,
  },
} satisfies Prisma.ProductSelect;

export type ProductSelectPayload = Prisma.ProductGetPayload<{
  select: typeof productSelect;
}>;
