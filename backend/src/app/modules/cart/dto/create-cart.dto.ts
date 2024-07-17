import { z } from 'zod';

export class CreateCartDto {
  qty: number;
  variantId: number;
}

export const createCartSchema = z.object({
  qty: z.number().min(1),
  variantId: z.number(),
});
