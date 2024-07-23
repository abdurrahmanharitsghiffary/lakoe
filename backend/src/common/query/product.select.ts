import { Prisma } from '@prisma/client';
import { selectSKU } from './sku.select';
import { selectAttributeSimplified } from './attribute.select';

export const selectProductSimplified = {
  id: true,
  images: true,
  categories: { select: { name: true } },
  description: true,
  isActive: true,
  minimumOrder: true,
  name: true,
  attributtes: { select: selectAttributeSimplified },
  _count: { select: { skus: true } },
} satisfies Prisma.ProductSelect;

export const selectProduct = {
  ...selectProductSimplified,
  skus: {
    select: selectSKU,
  },
} satisfies Prisma.ProductSelect;

export type ProductSelectPayload = Prisma.ProductGetPayload<{
  select: typeof selectProduct;
}>;
