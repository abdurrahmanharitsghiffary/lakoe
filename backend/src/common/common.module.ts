import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from './filters/exception/all-exception.filter';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from './services/cloudinary.service';
import { RoleGuard } from './guards/role/role.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { minutes, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { BiteShipService } from './services/biteship.service';

@Global()
@Module({
  imports: [
    ScheduleModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: minutes(10),
        limit: 100,
      },
    ]),
  ],
  providers: [
    BiteShipService,
    PrismaService,
    CloudinaryService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
  exports: [PrismaService, CloudinaryService, BiteShipService],
})
export class CommonModule {}
