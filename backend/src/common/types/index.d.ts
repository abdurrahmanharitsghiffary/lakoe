import { $Enums } from '@prisma/client';

export type UserPayload = { id: number; role: $Enums.Role };

declare module 'express' {
  export interface Request {
    user?: UserPayload;
  }
}
