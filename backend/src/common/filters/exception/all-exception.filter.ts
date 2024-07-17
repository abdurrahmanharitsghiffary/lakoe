import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { ThrottlerException } from '@nestjs/throttler';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    console.log(exception, 'Exception');

    if (exception instanceof ZodError) {
      return response.status(422).json({
        message: 'Failed to validate value.',
        errors: exception.issues,
        name: exception.name,
        statusCode: 422,
        success: false,
        code: (exception as any)?.code,
      });
    }

    if (exception instanceof JsonWebTokenError) {
      return response.status(403).json({
        success: false,
        statusCode: 403,
        message: exception?.message,
        name: exception.name,
        code: (exception as any)?.code,
      });
    }

    if (exception instanceof ThrottlerException) {
      return response.status(429).json({
        success: false,
        statusCodde: 429,
        message: 'Too Many Requests.',
        name: exception.name,
        code: (exception as any)?.code,
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      const exceptionResponse = exception.getResponse();
      console.log(exceptionResponse);

      return response.status(status).json({
        errors: (exceptionResponse as any)?.errors,
        message: exception.message,
        statusCode: status,
        name: exception.name,
        success: false,
        code: (exception as any)?.code,
      });
    }

    return response.status(500).json({
      name: (exception as any)?.name ?? null,
      statusCode: 500,
      message: 'Internal server error.',
      success: false,
      code: (exception as any)?.code,
    });
  }
}
