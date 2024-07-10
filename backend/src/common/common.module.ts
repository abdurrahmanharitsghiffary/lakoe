import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from './filters/exception/all-exception.filter';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
  exports: [PrismaService],
})
export class CommonModule {}
