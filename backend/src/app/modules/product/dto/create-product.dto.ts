import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { createSkuSchema, CreateSkuDto } from '../../sku/dto/create-sku.dto';
import { genRanNumber } from 'src/common/utils/gen-ran-num';

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

export const createProductSchema = z.object({
  description: zfd.text(z.string()),
  minimumOrder: zfd.numeric(z.number().min(1).positive()),
  categories: zfd.repeatable(z.array(zfd.text())).optional(),
  name: zfd.text(z.string().min(2)),
  skus: z.array(createSkuSchema).min(1),
});
