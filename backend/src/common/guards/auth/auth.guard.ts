import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride('skip-auth', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<Request>();

    if (skipAuth) return true;

    const token = this.getTokenFromHeaders(request);

    const decoded = await this.jwtService.verifyAsync(token);

    // request.user = decoded;

    return true;
  }

  getTokenFromHeaders(request: Request) {
    const [tokenType, token] = (request.headers['authorization'] ?? '').split(
      ' ',
    );

    if (tokenType !== 'Bearer')
      throw new UnauthorizedException('Invalid token type.');

    if (!token) throw new UnauthorizedException('No token provided.');

    return token;
  }
}
