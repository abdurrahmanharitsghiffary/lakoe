import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from './filters/exception/all-exception.filter';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth/auth.guard';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
  exports: [PrismaService],
})
export class CommonModule {}
