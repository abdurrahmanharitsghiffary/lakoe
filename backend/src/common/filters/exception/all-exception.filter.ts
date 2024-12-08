import { MidtransError } from '@miwone/midtrans-client-typescript/dist/lib/midtransError';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { ThrottlerException } from '@nestjs/throttler';
import { AxiosError } from 'axios';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    console.log(exception, 'Exception');

    if (exception instanceof MidtransError) {
      return response.status(+exception.httpStatusCode).json({
        success: false,
        statusCode: +exception.httpStatusCode,
        message: exception?.ApiResponse?.status_message ?? exception?.message,
        name: exception.name,
      });
    }

    if (exception instanceof AxiosError) {
      if (exception.config.baseURL.includes('api.biteship')) {
        return response.status(400).json({
          success: false,
          statusCode: 400,
          message: exception?.response?.data?.error,
          name: exception?.name,
          code: exception?.response?.data?.code,
        });
      }
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
      const objRes =
        typeof exceptionResponse === 'string' ? {} : exceptionResponse;

      if (exception.cause instanceof ZodError) {
        return response.status(422).json({
          message: exception.message,
          errors: exception.cause.errors,
          name: exception.name,
          statusCode: status,
          success: false,
          code: (exception as any)?.code,
          ...objRes,
        });
      }

      return response.status(status).json({
        message: exception.message,
        statusCode: status,
        name: exception.name,
        success: false,
        code: (exception as any)?.code,
        ...objRes,
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
