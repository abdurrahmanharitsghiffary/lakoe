import { SetMetadata } from '@nestjs/common';

export const AuthOptional = () => SetMetadata('auth-optional', true);
