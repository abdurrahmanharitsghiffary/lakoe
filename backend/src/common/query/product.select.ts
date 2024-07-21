import { Prisma } from '@prisma/client';
import { selectSKU } from './sku.select';

export const productSelect = {
  id: true,
  images: true,
  categories: { select: { name: true } },
  description: true,
  isActive: true,
  minimumOrder: true,
  name: true,
  skus: {
    select: selectSKU,
  },
} satisfies Prisma.ProductSelect;

export type ProductSelectPayload = Prisma.ProductGetPayload<{
  select: typeof productSelect;
}>;
