import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAuthDto,
  createAuthSchema,
  LoginDto,
  loginSchema,
} from './dto/create-auth.dto';

import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { hours, Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';

@ApiTags('Auth')
@SkipAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { ttl: hours(1), limit: 5 } })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async create(
    @Body(new ZodValidationPipe(createAuthSchema)) response: CreateAuthDto,
  ) {
    return await this.authService.register(response);
  }

  @Throttle({ default: { ttl: hours(1), limit: 5 } })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body(new ZodValidationPipe(loginSchema)) response: LoginDto) {
    return await this.authService.login(response);
  }
}
