import { z } from 'zod';

export class CreateAuthDto {
  fullName: string;
  username: string;
  profilePicture?: string;
  birthDate?: Date;
  phone: string;
  email: string;
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, 'Password min length is 8 characters').max(30),
});

export const createAuthSchema = z.object({
  fullName: z.string().min(1, 'Name cannot be empty').max(255),
  username: z.string().min(1, 'Username cannot be empty').max(255),
  profilePicture: z.string().min(1, 'Profile picture cannot be empty').max(255),
  birthDate: z.date().optional(),
  phone: z.string().min(1, 'Phone cannot be empty').max(255),
  email: z.string().min(1, 'Email cannot be empty').max(255),
  password: z.string().min(8, 'Password cannot be empty').max(30),
});
