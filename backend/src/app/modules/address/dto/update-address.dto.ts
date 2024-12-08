import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';
import { z } from 'zod';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}

export const updateAddressSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().min(5).max(50).optional(),
  city: z.string().optional(),
  disctrict: z.string().optional(),
  province: z.string().optional(),
  latitude: z.string().max(20).optional(),
  longitude: z.string().max(20).optional(),
  isMainLocation: z.boolean().optional(),
});
