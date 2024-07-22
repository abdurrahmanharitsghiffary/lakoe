import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { genRanNumber } from 'src/common/utils/gen-ran-num';
import { z } from 'zod';

export class CreateSkuDto {
  stock: number = genRanNumber();
  isActive?: boolean = true;
  discount?: number;
  discountType?: 'FIXED' | 'PERCENTAGE' = 'FIXED';
  weightInGram: number = genRanNumber();
  price: number = genRanNumber();
  @ApiProperty({ type: () => [SkuAttribute] })
  skuAttribute?: SkuAttribute[];
}

export class SkuAttribute {
  value: string = faker.helpers.arrayElement(['SM', 'XL', 'XXL', 'L', 'M']);
  attributeName: string = faker.helpers.arrayElement(['Size']);
}

export const createSkuAttributeSchema = z.object({
  value: z.string().min(1),
  attributeName: z.string().min(1),
});

export const createSkuSchema = z.object({
  stock: z.number().min(1).positive(),
  isActive: z.boolean().optional(),
  discount: z.number().optional(),
  discountType: z.enum(['FIXED', 'PERCENTAGE']).optional(),
  weightInGram: z.number().min(1).positive(),
  price: z.number().min(1).positive(),
  skuAttribute: z.array(createSkuAttributeSchema).optional(),
});
