import { Prisma } from '@prisma/client';
import { selectVariant } from './variant.select';

export const productSelect = {
  id: true,
  attachments: true,
  categories: { select: { name: true } },
  description: true,
  isActive: true,
  minimumOrder: true,
  name: true,
  variants: {
    select: selectVariant,
  },
} satisfies Prisma.ProductSelect;

export type ProductSelectPayload = Prisma.ProductGetPayload<{
  select: typeof productSelect;
}>;
