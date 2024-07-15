import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { $Enums } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authOptional = this.reflector.getAllAndOverride('auth-optional', [
      context.getHandler(),
      context.getClass(),
    ]);
    const skipAuth = this.reflector.getAllAndOverride('skip-auth', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context
      .switchToHttp()
      .getRequest<Request & { user: any }>();

    if (skipAuth && !authOptional) return true;

    const token = this.getTokenFromHeaders(request);

    try {
      const decoded = await this.jwtService.verifyAsync<{
        id: number;
        role: $Enums.Role;
      }>(token);
      request.user = decoded;
    } catch (err) {
      if (authOptional) return true;
      throw err;
    }

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
