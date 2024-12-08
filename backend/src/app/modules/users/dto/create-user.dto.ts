import { $Enums } from '@prisma/client';
import { Z } from '@/common/libs/zod';
import { z } from 'zod';

export class CreateUserDto {
  email: string;
  password: string;
  isVerified?: boolean;
  role?: $Enums.Role;
  fullName: string;
  username: string;
  profilePicture?: string;
  bio?: string;
  phone?: string;
  gender?: $Enums.Gender;
  birthDate?: Date;
}

export const createUserSchema = z.object({
  email: z.string().min(1).max(255),
  password: z.string().min(8).max(255),
  isVerified: z.boolean().optional(),
  role: z.enum(['USER', 'ADMIN']).optional(),
  fullName: z.string().min(1).max(255),
  username: z.string().min(1).max(255),
  bio: z.string().optional(),
  phone: Z.phone.optional(),
  gender: z.enum(['MALE', 'FEMALE']).optional(),
  birthDate: z.date().optional(),
});
