import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    console.error(exception, 'ERROR');
    const response = host.switchToHttp().getResponse<Response>();
    console.log(exception, 'Exception');
    if (exception instanceof ZodError) {
      return response.status(422).json({
        message: 'Failed to validate value.',
        errors: exception.issues,
        name: exception.name,
        statusCode: 422,
        success: false,
      });
    }

    if (exception instanceof ThrottlerException) {
      return response.status(429).json({
        success: false,
        statusCodde: 429,
        message: 'Too Many Requests.',
        name: exception.name,
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      return response.status(status).json({
        message: exception.message,
        statusCode: status,
        name: exception.name,
        success: false,
      });
    }

    return response.status(500).json({
      name: (exception as any)?.name ?? null,
      statusCode: 500,
      message: 'Internal server error.',
      success: false,
    });
  }
}
