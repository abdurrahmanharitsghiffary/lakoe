import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAuthDto,
  createAuthSchema,
  LoginDto,
  loginSchema,
} from './dto/create-auth.dto';

import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
// import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(
    @Body(new ZodValidationPipe(createAuthSchema)) response: CreateAuthDto,
  ) {
    return await this.authService.register(response);
  }

  // @Throttle({ default: { ttl: 60, limit: 3 } })
  @Post('login')
  async login(@Body(new ZodValidationPipe(loginSchema)) response: LoginDto) {
    return await this.authService.login(response);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() email: string) {
    return await this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() email: string, newPassword: string) {
    return await this.authService.resetPassword(email, newPassword);
  }
}
