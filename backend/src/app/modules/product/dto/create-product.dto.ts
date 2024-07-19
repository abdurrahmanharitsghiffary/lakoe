import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export class SubVariantDto {
  weightInGram: number;
  stock: number;
  price: number;
  name: string;
  discount?: number;
}

export class CreateVariantDto {
  weightInGram?: number;
  stock?: number;
  price?: number;
  name: string;
  discount?: number;
  subVariants?: SubVariantDto[];
}

export class CreateProductDto {
  description: string;
  minimumOrder: number;
  categories?: string[];
  name: string;
  @ApiProperty({ type: () => [CreateVariantDto] })
  variants: CreateVariantDto[];
}

export const createProductSchema = z.object({
  description: zfd.text(z.string()),
  minimumOrder: zfd.numeric(z.number().min(1).positive()),
  categories: zfd.repeatable(z.array(zfd.text())).optional(),
  name: zfd.text(z.string().min(2)),
  variants: zfd.repeatable(
    z.array(
      z.object({
        weightInGram: z.number().min(1).optional(),
        stock: z.number().min(1).optional(),
        price: z.number().min(1).optional(),
        name: z.string().min(1).max(125),
        discount: z.number().min(1).optional(),
      }),
    ),
  ),
});
