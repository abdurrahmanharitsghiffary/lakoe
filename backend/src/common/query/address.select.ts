import { Prisma } from '@prisma/client';

export const selectAddress = {
  contactName: true,
  contactPhone: true,
  addressPhone: true,
  address: true,
  city: true,
  createdAt: true,
  district: true,
  id: true,
  isMainLocation: true,
  latitude: true,
  longitude: true,
  name: true,
  postalCode: true,
  province: true,
  updatedAt: true,
  storeId: true,
} satisfies Prisma.AddressSelect;

export type Address = Prisma.AddressGetPayload<{
  select: typeof selectAddress;
}>;
