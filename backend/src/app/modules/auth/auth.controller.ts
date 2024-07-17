import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  authResetSchema,
  CreateAuthDto,
  createAuthSchema,
  LoginDto,
  loginSchema,
} from './dto/create-auth.dto';

import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { hours, Throttle } from '@nestjs/throttler';
import { z } from 'zod';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';

@Controller('auth')
@SkipAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { ttl: hours(1), limit: 5 } })
  @Post('register')
  async create(
    @Body(new ZodValidationPipe(createAuthSchema)) response: CreateAuthDto,
  ) {
    return await this.authService.register(response);
  }

  @Throttle({ default: { ttl: hours(1), limit: 5 } })
  @Post('login')
  async login(@Body(new ZodValidationPipe(loginSchema)) response: LoginDto) {
    return await this.authService.login(response);
  }

  @Post('verify-email')
  async sendVerifyEmail(
    @Body('email', new ZodValidationPipe(z.string().email())) email: string,
  ) {
    return await this.authService.reqVerifyToken(email);
  }

  @Post('verify-email/:token')
  async verifyEmail(@Param('token') token: string) {
    return await this.authService.verifyEmail(token);
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body('email', new ZodValidationPipe(z.string().email())) email: string,
  ) {
    return await this.authService.forgotPassword(email);
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body(new ZodValidationPipe(authResetSchema)) body: { newPassword: string },
  ) {
    return await this.authService.resetPassword(token, body.newPassword);
  }
}
