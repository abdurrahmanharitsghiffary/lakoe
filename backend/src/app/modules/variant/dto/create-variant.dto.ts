import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

class Variant {
  name: string;
  isActive?: boolean;
  weightInGram?: number;
  stock?: number;
  price?: number;
}

export class CreateVariantDto {
  productId: number;
  parentId?: number;
  @ApiProperty({ type: () => [Variant] })
  variants: Variant[];
}

export const createVariantSchema = z.object({
  variants: z.array(
    z.object({
      name: z.string(),
      isActive: z.boolean().optional(),
      weightInGram: z.number().min(1).positive().optional(),
      stock: z.number().min(1).positive().optional(),
      price: z.number().min(1).positive().optional(),
    }),
  ),
  parentId: z.number().min(1).positive().optional(),
  productId: z.number().min(1).positive(),
});
