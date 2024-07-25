import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { genRanNumber } from '@/common/utils/gen-ran-num';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

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

export const zfdCreateSkuAttributeSchema = z.object({
  value: zfd.text(z.string().min(1)),
  attributeName: zfd.text(z.string().min(1)),
});

export const zfdCreateSkuSchema = z.object({
  stock: zfd.numeric(z.number().min(1).positive()),
  isActive: zfd.checkbox({ trueValue: 'true' }),
  discount: zfd.numeric(z.number().optional()),
  discountType: zfd.text(z.enum(['FIXED', 'PERCENTAGE']).optional()),
  weightInGram: zfd.numeric(z.number().min(1).positive()),
  price: zfd.numeric(z.number().min(1).positive()),
  skuAttribute: zfd.repeatable(z.array(zfdCreateSkuAttributeSchema).optional()),
});
