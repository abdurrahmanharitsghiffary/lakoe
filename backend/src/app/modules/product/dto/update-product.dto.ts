import { z } from 'zod';

export class UpdateProductDto {
  name?: string;
  description?: string;
  minimumOrder?: number;
  categories?: string[];
}

export const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  minimumOrder: z.number().min(1).positive().optional(),
  categories: z.array(z.string()).optional(),
});
