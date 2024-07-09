import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './filters/exception/all-exception.filter';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: APP_FILTER, useClass: AllExceptionFilter },
  ],
  exports: [PrismaService],
})
export class CommonModule {}
