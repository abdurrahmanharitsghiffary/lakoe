import { z } from 'zod';

export const getProductsSchema = z.object({
  active: z.enum(['true', 'false']).optional(),
  q: z.string().optional(),
});

export type GetProductsSchema = z.infer<typeof getProductsSchema>;
