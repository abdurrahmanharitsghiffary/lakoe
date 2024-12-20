import { Z } from '@/common/libs/zod';
import { z } from 'zod';

export class CreateAuthDto {
  fullName: string;
  username: string;
  phone: string;
  email: string;
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}

export class ResetTokenDto {
  email: string;
}

export class ResetPasswordDto {
  token: string;
  newPassword: string;
}

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, 'Password min length is 8 characters').max(30),
});

export const createAuthSchema = z.object({
  fullName: z.string().min(1, 'Name cannot be empty').max(255),
  username: z.string().min(1, 'Username cannot be empty').max(255),
  phone: Z.phone,
  email: z.string().min(1, 'Email cannot be empty').max(255),
  password: z.string().min(8, 'Password cannot be empty').max(30),
});

export const authResetSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Password min length is 8 characters')
      .max(30),
    confirmPassword: z.string(),
  })
  .refine((arg) => arg.newPassword === arg.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
