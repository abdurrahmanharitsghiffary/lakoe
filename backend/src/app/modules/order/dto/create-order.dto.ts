import { Z } from 'src/common/libs/zod';
import { z } from 'zod';

type Product = {
  id: number;
  qty: number;
};

export type CreateOrderDto = {
  description?: string;
  products: Product[];
} & CreateInvoiceDto

export const orderSchema = z.object({
  description: z.string().optional(),
  product: z.string()
})


export type CreateInvoiceDto = {
  receiverContactName: string;
  receiverContactPhone: string;
  receiverName: string;
  receiverAddressPhone: string;
  receiverAddress: string;
  receiverPostalCode: string;
  receiverCity: string;
  receiverDistrict: string;
  receiverProvince: string;
  receiverLatitude?: string;
  receiverLongitude?: string;
  paymentId: number;
  courierId: number; 
};


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
