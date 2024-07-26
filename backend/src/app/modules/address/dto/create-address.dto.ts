import { Z } from '@/common/libs/zod';
import { z } from 'zod';

export class CreateAddressDto {
  contactName?: string = 'John Doe';
  contactPhone?: string = '+6281221214343';
  addressPhone: string = '+6281221214343';
  name: string = 'Address 1';
  address: string;
  postalCode: string;
  city: string;
  district: string;
  province: string;
  latitude: string;
  longitude: string;
  isMainLocation: boolean;
}

export const createAddressSchema = z.object({
  contactName: z.string().min(1).optional(),
  contactPhone: Z.phone.optional(),
  addressPhone: Z.phone,
  name: z.string(),
  address: z.string(),
  postalCode: z.string().min(5).max(50),
  city: z.string(),
  district: z.string(),
  province: z.string(),
  latitude: z.string().max(20),
  longitude: z.string().max(20),
  isMainLocation: z.boolean().optional(),
});
