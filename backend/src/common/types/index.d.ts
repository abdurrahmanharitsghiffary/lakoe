import { $Enums } from '@prisma/client';

export type UserPayload = { id: number; role: $Enums.Role; storeId?: number };

declare module 'express' {
  export interface Request {
    user?: UserPayload;
  }
}
