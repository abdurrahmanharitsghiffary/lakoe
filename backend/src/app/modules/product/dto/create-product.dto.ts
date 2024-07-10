import { z } from 'zod';

export class CreateProductDto {
  name: string;
  description: string;
  minimumOrder: number;
  categories?: string[];
  weightInGram: number;
  stock: number;
  price: number;
}

export const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string(),
  minimumOrder: z.number().min(1).positive(),
  categories: z.array(z.string()).optional(),
  weightInGram: z.number().min(1).positive(),
  stock: z.number().min(1).positive(),
  price: z.number().positive(),
});
