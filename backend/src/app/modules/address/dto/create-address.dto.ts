import { z } from 'zod';

export class CreateAddressDto {
  contactName = 'John Doe';
  contactPhone = '+6281221214343';
  addressPhone = '+6281221214343';
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
  name: z.string(),
  address: z.string(),
  postalCode: z.string().min(5).max(50),
  city: z.string(),
  disctrict: z.string(),
  province: z.string(),
  latitude: z.string().max(20),
  longitude: z.string().max(20),
  isMainLocation: z.boolean().optional(),
});
