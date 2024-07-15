import { z } from 'zod';
import { zfd } from 'zod-form-data';

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
  name: zfd.text(z.string().min(2)),
  description: zfd.text(z.string()),
  minimumOrder: zfd.numeric(z.number().min(1).positive()),
  categories: zfd.repeatable(z.array(zfd.text())).optional(),
  weightInGram: zfd.numeric(z.number().min(1).positive()),
  stock: zfd.numeric(z.number().min(1).positive()),
  price: zfd.numeric(z.number().positive()),
});
