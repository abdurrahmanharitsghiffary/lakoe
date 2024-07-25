import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { ApiResponse } from 'src/common/class/api-response';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ignoreTransformResponse = this.reflector.getAllAndOverride(
      'ignore-transform-response',
      [context.getHandler(), context.getClass()],
    );
    const statusCode = context
      .switchToHttp()
      .getResponse<Response>().statusCode;

    if (ignoreTransformResponse) return next.handle();

    return next.handle().pipe(map((data) => new ApiResponse(statusCode, data)));
  }
}
