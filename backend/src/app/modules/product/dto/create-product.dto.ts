import { z } from 'zod';

export class CreateProductDto {
  name: string;
  description: string;
  attachments?: string[];
  isActive: boolean;
  minimumOrder: number;
  storeId: number;
  categories?: CreateCategoryDto[];
  variants?: CreateVariantDto[];
}

export class CreateVariantDto {
  name: string;
}

export class CreateCategoryDto {
  name: string;
}

export const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  minimumOrder: z.number().min(1).positive(),
  // categories: z.array(z.string()),
  // weight: z.number().min(1).positive(),
  // stock: z.number().min(1).positive(),
  // price: z.number().positive(),
});
