import { Prisma } from '@prisma/client';
import { selectVariant } from './variant.select';

export const selectOrderSimplified = {
  createdAt: true,
  description: true,
  id: true,
  status: true,
  updatedAt: true,
  invoice: {
    select: {
      invoiceNumber: true,
      prices: true,
      courier: {
        select: {
          biteshipOrderId: true,
          biteshipTrackingId: true,
          biteshipWaybillId: true,
          price: true,
          courierCode: true,
          courierServiceCode: true,
          courierServiceName: true,
        },
      },
    },
  },
  products: { select: { productVariant: { select: selectVariant } } },
} satisfies Prisma.OrderSelect;

export const selectOrder = {
  ...selectOrderSimplified,
  createdAt: true,
  description: true,
  id: true,
  status: true,
  updatedAt: true,
  invoice: {
    select: {
      ...selectOrderSimplified.invoice.select,
      id: true,
      invoiceNumber: true,
      prices: true,
      receiverAddress: true,
      receiverAddressPhone: true,
      receiverCity: true,
      receiverContactName: true,
      receiverContactPhone: true,
      receiverDistrict: true,
      receiverLatitude: true,
      receiverLongitude: true,
      receiverName: true,
      receiverPostalCode: true,
      receiverProvince: true,
      serviceCharge: true,
      updatedAt: true,
      createdAt: true,
      courier: {
        select: {
          biteshipOrderId: true,
          biteshipTrackingId: true,
          biteshipWaybillId: true,
          courierCode: true,
          courierServiceCode: true,
          courierServiceName: true,
          price: true,
        },
      },
    },
  },
} satisfies Prisma.OrderSelect;
