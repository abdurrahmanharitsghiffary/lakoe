import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { z } from 'zod';

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  minimumOrder: z.number().min(1).positive().optional(),
  categories: z.array(z.string()).optional(),
  // weightInGram: z.number().min(1).positive().optional(),
  // stock: z.number().min(1).positive().optional(),
  // price: z.number().positive().optional(),
});
