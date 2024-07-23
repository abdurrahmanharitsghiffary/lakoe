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

export const courierSchema = z.object({
  courierServiceCode: z.string(),
  courierCode: z.string(),
});

export class CreateCourierDto {
  courierServiceCode: string = 'reg';
  courierCode: string = 'jne';
}

export class CreateInvoiceDto {
  receiverContactName: string = 'John Doe';
  receiverContactPhone: string = '+628170032123';
  receiverName: string = 'John Doe';
  receiverAddressPhone: string = '+628170032123';
  receiverAddress: string = 'Jakarta lb bulus';
  receiverPostalCode: string = '12950';
  receiverCity: string = 'Bogor';
  receiverDistrict: string = 'Parung';
  receiverProvince: string = 'Jawa Barat';
  receiverLatitude?: string = '-6.436870204535388';
  receiverLongitude?: string = '106.7109946274437';
}

export class CreateOrderDto extends CreateInvoiceDto {
  @ApiProperty({ type: () => CreateCourierDto })
  courier: CreateCourierDto;
  orderNote?: string = 'Hallo bang rumahku yg disebelah pohon jubleg';
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

export const createOrderSchema = invoiceSchema.extend({
  courier: courierSchema,
  orderNote: z.string().min(1).optional(),
  skus: z.array(skuSchema).min(1),
});
