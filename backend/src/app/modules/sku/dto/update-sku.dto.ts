import { genRanNumber } from '@/common/utils/gen-ran-num';
import { createSkuSchema } from './create-sku.dto';

export class UpdateSkuDto {
  stock?: number = genRanNumber();
  isActive?: boolean = true;
  discount?: number;
  discountType?: 'FIXED' | 'PERCENTAGE' = 'FIXED';
  weightInGram?: number = genRanNumber();
  price?: number = genRanNumber();
}

export const updateSkuSchema = createSkuSchema
  .omit({ skuAttribute: true })
  .partial();
