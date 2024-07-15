import { $Enums } from '@prisma/client';
import { z } from 'zod';

export class CreateAuthDto {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: $Enums.Role;
}

export const createAuthSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty').max(255),
  phone: z.string().min(1, 'Phone cannot be empty').max(255),
  email: z.string().min(1, 'Email cannot be empty').max(255),
  password: z.string().min(1, 'Password cannot be empty').max(255),
});
