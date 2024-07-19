import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  Get,
  Redirect,
} from '@nestjs/common';
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
import { ApiTags } from '@nestjs/swagger';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UserPayload } from 'src/common/types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { ttl: hours(1), limit: 5 } })
  @HttpCode(HttpStatus.OK)
  @SkipAuth()
  @Post('register')
  async create(
    @Body(new ZodValidationPipe(createAuthSchema)) response: CreateAuthDto,
  ) {
    return await this.authService.register(response);
  }

  @Throttle({ default: { ttl: hours(1), limit: 5 } })
  @HttpCode(HttpStatus.OK)
  @SkipAuth()
  @Post('login')
  async login(@Body(new ZodValidationPipe(loginSchema)) response: LoginDto) {
    return await this.authService.login(response);
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-email')
  async sendVerifyEmail(@User() user: UserPayload) {
    return await this.authService.reqVerifyToken(user?.id);
  }

  @SkipAuth()
  @Redirect(`${process.env.BASE_CLIENT_URL}/auth/verified`, HttpStatus.FOUND)
  @Get('verify-email/:token')
  async verifyEmail(@Param('token') token: string) {
    return await this.authService.verifyEmail(token);
  }

  @SkipAuth()
  @Post('forgot-password')
  async forgotPassword(
    @Body('email', new ZodValidationPipe(z.string().email())) email: string,
  ) {
    return await this.authService.forgotPassword(email);
  }

  @SkipAuth()
  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body(new ZodValidationPipe(authResetSchema)) body: { newPassword: string },
  ) {
    return await this.authService.resetPassword(token, body.newPassword);
  }
}
