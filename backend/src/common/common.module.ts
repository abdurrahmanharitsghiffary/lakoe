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
import { BiteshipModule } from './modules/biteship/biteship.module';

@Global()
@Module({
  imports: [
    BiteshipModule,
    ScheduleModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: minutes(10),
        limit: 10000,
      },
    ]),
  ],
  providers: [
    PrismaService,
    CloudinaryService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
  exports: [PrismaService, CloudinaryService, BiteshipModule],
})
export class CommonModule {}
