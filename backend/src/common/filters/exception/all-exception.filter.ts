import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof ZodError) {
      return response.status(422).json({
        message: 'Failed to validate value.',
        errors: exception.issues,
        name: exception.name,
        statusCode: 422,
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      return response.status(status).json({
        message: exception.message,
        statusCode: status,
        name: exception.name,
      });
    }

    return response
      .status(500)
      .json({ statusCode: 500, message: 'Internal server error.' });
  }
}
