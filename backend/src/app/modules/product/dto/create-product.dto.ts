import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const genRanNumber = () => +Date.now().toString().slice(-2);

export class CreateProductDto {
  description: string = faker.commerce.productDescription();
  minimumOrder: number = genRanNumber();
  categories?: string[] = Array(3)
    .fill(null)
    .map(() => faker.commerce.department());
  name: string = faker.commerce.productName();
  @ApiProperty({ type: () => [CreateSkuDto] })
  skus: CreateSkuDto[];
}

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

export const createSkuDto = z.object({
  stock: z.number().min(1).positive(),
  isActive: z.boolean().optional(),
  discount: z.number().optional(),
  discountType: z.enum(['FIXED', 'PERCENTAGE']).optional(),
  weightInGram: z.number().min(1).positive(),
  price: z.number().min(1).positive(),
  skuAttribute: z.array(createSkuAttributeSchema).optional(),
});

export const createProductSchema = z.object({
  description: zfd.text(z.string()),
  minimumOrder: zfd.numeric(z.number().min(1).positive()),
  categories: zfd.repeatable(z.array(zfd.text())).optional(),
  name: zfd.text(z.string().min(2)),
  skus: z.array(createSkuDto).min(1),
});
