import { z } from 'zod';
import { zfd } from 'zod-form-data';

export class CreateProductDto {
  description: string;
  minimumOrder: number;
  categories?: string[];
  name: string;
  // weightInGram: number;
  // stock: number;
  // price: number;
}

export const createProductSchema = z.object({
  description: zfd.text(z.string()),
  minimumOrder: zfd.numeric(z.number().min(1).positive()),
  categories: zfd.repeatable(z.array(zfd.text())).optional(),
  name: zfd.text(z.string().min(2)),
  // weightInGram: zfd.numeric(z.number().min(1).positive()),
  // stock: zfd.numeric(z.number().min(1).positive()),
  // price: zfd.numeric(z.number().positive()),
});
