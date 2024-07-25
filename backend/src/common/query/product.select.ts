import { Prisma } from '@prisma/client';
import { selectSKU } from './sku.select';
import { omitProperties } from '../utils/omit-properties';
import { selectStore } from './store.select';

export const selectProductSimplified = {
  id: true,
  images: true,
  categories: { select: { name: true } },
  description: true,
  isActive: true,
  minimumOrder: true,
  name: true,
  attributtes: {
    select: {
      name: true,
      skuAttributes: { select: { value: true }, distinct: ['value'] },
    },
  },
  _count: { select: { skus: true } },
} satisfies Prisma.ProductSelect;

export const selectProduct = {
  ...selectProductSimplified,
  store: { select: omitProperties(selectStore, ['user', '_count']) },
  skus: {
    select: omitProperties(selectSKU, ['product']),
  },
} satisfies Prisma.ProductSelect;

export type ProductSelectPayload = Prisma.ProductGetPayload<{
  select: typeof selectProduct;
}>;
