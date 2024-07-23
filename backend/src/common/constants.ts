import { $Enums } from '@prisma/client';

export const RESOURCE_GUARD_OPTIONS_TOKEN = 'resource-guard-options';

export const ERROR_CODE = {
  INACTIVE: 'INACTIVE',
  NOT_FOUND: 'NOT_FOUND',
  UNIQUE: 'UNIQUE',
  FORBIDDEN: 'FORBIDDEN',
  UNAUTHORIZE: 'UNAUTHORIZE',
  DUPLICATE: 'DUPLICATE',
  INSUFFICIENT_STOCK: 'INSUFFICIENT_STOCK',
  NOT_ACTIVE: 'NOT_ACTIVE',
} as const;

export const ERR = {
  CHANGE_ORDER_STATUS_NOT_ACCEPTED: (status: $Enums.OrderStatus) =>
    `Order cannot be accepted or rejected. Current status: ${status}. Allowed status: NEW_ORDER.`,
  STORE_COURIER_NOT_FOUND: 'Store has not activated any courier options.',
  UNABLE_CALCULATE_SHIPPING_RATE:
    'Store is missing an active location required to calculate the shipping rate.',
} as const;
