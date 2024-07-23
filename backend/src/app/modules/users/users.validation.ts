import { z } from 'zod';

// export class UserValidation {
//   static readonly register: ZodType = z.object({
//     name: z.string().min(1, 'Name cannot be empty').max(255),
//     phone: z.string().min(1, 'Phone cannot be empty').max(255),
//     email: z.string().min(1, 'Email cannot be empty').max(255),
//     password: z.string().min(1, 'Password cannot be empty').max(255),
//   });
// }

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty').max(255),
  phone: z.string().min(1, 'Phone cannot be empty').max(255),
  email: z.string().min(1, 'Email cannot be empty').max(255),
  password: z.string().min(1, 'Password cannot be empty').max(255),
});
