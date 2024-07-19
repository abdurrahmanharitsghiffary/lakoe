import { z } from 'zod';

export const getProductsSchema = z.object({
  active: z.enum(['true', 'false']).optional(),
  q: z.string().optional(),
  sort_by: z
    .enum(['highest_price', 'lowest_price', 'highest_stock', 'lowest_stock'])
    .optional(),
  categories: z.string().optional(),
});

export type GetProductsSchema = z.infer<typeof getProductsSchema>;
