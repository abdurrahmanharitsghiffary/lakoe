import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { z } from 'zod';
import { Z } from 'src/common/libs/zod';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export const updatecreateUserSchema = z.object({
  email: z.string().min(1).max(255).optional(),
  password: z.string().min(8).max(255).optional(),
  isVerified: z.boolean().optional(),
  role: z.enum(['USER', 'ADMIN']).optional(),
  fullName: z.string().min(1).max(255).optional(),
  username: z.string().min(1).max(255).optional(),
  bio: z.string().optional(),
  phone: Z.phone.optional(),
  gender: z.enum(['MALE', 'FEMALE']).optional(),
  birthDate: z.date().optional(),
});
