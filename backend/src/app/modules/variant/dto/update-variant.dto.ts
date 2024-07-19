import { z } from 'zod';
import { zfd } from 'zod-form-data';

export class UpdateVariantDto {
  name?: string;
  isActive?: boolean;
  weightInGram?: number;
  stock?: number;
  price?: number;
}

export const updateVariantSchema = zfd.formData(
  z.object({
    name: z.string().min(2).optional(),
    isActive: z.boolean().optional(),
    weightInGram: z.number().min(1).positive(),
    stock: z.number().min(1).positive(),
    price: z.number().min(1).positive(),
  }),
);
