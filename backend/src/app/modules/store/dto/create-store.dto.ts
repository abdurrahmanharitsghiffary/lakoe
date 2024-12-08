import { z } from 'zod';
import { zfd } from 'zod-form-data';
import {
  CreateInvoiceDto,
  invoiceSchema,
  Sku,
} from '../../order/dto/create-order.dto';
import { ApiProperty } from '@nestjs/swagger';
import { skuSchema } from '../../cart/dto/cart.dto';

export class CreateStoreDto {
  name: string;
  slogan: string;
  description: string;
}

export const createStoreSchema = zfd.formData(
  z.object({
    name: zfd.text(z.string().min(2)),
    slogan: zfd.text(z.string().min(2)),
    description: zfd.text(z.string().min(2)),
  }),
);

export class GetShippingRatesDto {
  address: CreateInvoiceDto;
  @ApiProperty({ type: () => [Sku] })
  skus: Sku[];
}

export const getShippingRatesSchema = z.object({
  address: invoiceSchema,
  skus: z.array(skuSchema),
});
