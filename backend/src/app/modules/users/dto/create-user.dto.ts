import { $Enums } from '@prisma/client';

export class CreateUserDto {
  name: string;

  phone: string;

  email: string;

  password: string;

  role: $Enums.Role;
}
