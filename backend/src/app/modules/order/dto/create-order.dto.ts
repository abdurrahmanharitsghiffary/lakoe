import { ApiProperty } from '@nestjs/swagger';
import { Z } from 'src/common/libs/zod';
import { z } from 'zod';

export class Sku {
  id: number = 6;
  qty: number = 2;
}

export const skuSchema = z.object({
  id: z.number().min(1).positive(),
  qty: z.number().min(1).positive(),
});

export const orderSchema = z.object({
  description: z.string().optional(),
  skus: z.array(skuSchema).min(1),
});

export class CreateInvoiceDto {
  receiverContactName: string = 'John Doe';
  receiverContactPhone: string = '08170032123';
  receiverName: string = 'John Doe';
  receiverAddressPhone: string = '08170032123';
  receiverAddress: string = 'Jakarta lb bulus';
  receiverPostalCode: string = '12950';
  receiverCity: string = 'Bogor';
  receiverDistrict: string = 'Parung';
  receiverProvince: string = 'Jawa Barat';
  receiverLatitude?: string = '-6.436870204535388';
  receiverLongitude?: string = '106.7109946274437';
}

export class CreateOrderDto extends CreateInvoiceDto {
  description?: string;
  @ApiProperty({ type: () => [Sku] })
  skus: Sku[];
}

export const invoiceSchema = z.object({
  receiverContactName: z.string(),
  receiverContactPhone: Z.phone,
  receiverName: z.string(),
  receiverAddressPhone: z.string(),
  receiverAddress: z.string(),
  receiverPostalCode: z.string().min(5),
  receiverCity: z.string(),
  receiverDistrict: z.string(),
  receiverProvince: z.string(),
  receiverLatitude: z.string().max(20),
  receiverLongitude: z.string().max(20),
});
