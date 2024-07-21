import { Prisma } from '@prisma/client';
import { selectSKU } from './sku.select';

export const selectOrderSimplified = {
  createdAt: true,
  description: true,
  id: true,
  status: true,
  updatedAt: true,
  invoice: {
    select: {
      id: true,
      invoiceNumber: true,
      amount: true,
    },
  },
  courier: {
    select: {
      id: true,
      biteshipOrderId: true,
      biteshipTrackingId: true,
      biteshipWaybillId: true,
      price: true,
      courierCode: true,
      courierServiceCode: true,
    },
  },
  orderDetails: {
    select: {
      sku: { select: selectSKU },
      qty: true,
      pricePerProduct: true,
      weightPerProductInGram: true,
    },
  },
  _count: { select: { orderDetails: true } },
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
      amount: true,
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
    },
  },
} satisfies Prisma.OrderSelect;
