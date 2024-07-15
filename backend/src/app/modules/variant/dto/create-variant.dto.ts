import { z } from 'zod';
import { zfd } from 'zod-form-data';

export class CreateVariantDto {
  name: string;
  isActive?: boolean;
  weightInGram?: number;
  stock?: number;
  price?: number;
  parentId?: number;
  productId: number;
}

export const createVariantSchema = zfd.formData(
  z.object({
    name: z.string().min(2),
    isActive: z.boolean().optional(),
    weightInGram: z.number().min(1).positive().optional(),
    stock: z.number().min(1).positive().optional(),
    price: z.number().min(1).positive().optional(),
    parentId: z.number().min(1).positive().optional(),
    productId: z.number().min(1).positive(),
  }),
);
