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
import { APP_CONFIG } from 'src/common/config/app.config';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
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

    const request = context.switchToHttp().getRequest<Request>();
    console.log(process.env.NODE_ENV);
    if (APP_CONFIG.TESTING.DISABLE_AUTH_IN_DEV) {
      console.log(APP_CONFIG, 'AP CINFIG');
      if (APP_CONFIG.TESTING.LOGIN_AS.USER_2)
        request.user = { id: 2, role: 'ADMIN' };

      if (APP_CONFIG.TESTING.LOGIN_AS.USER_1_NOT_ADMIN)
        request.user = { id: 1, role: 'USER' };

      if (APP_CONFIG.TESTING.LOGIN_AS.USER_1)
        request.user = { id: 1, role: 'ADMIN' };
      return true;
    }

    if (skipAuth && !authOptional) return true;

    const token = this.getTokenFromHeaders(request);

    try {
      const decoded = await this.jwtService.verifyAsync<{
        id: number;
        role: $Enums.Role;
      }>(token);

      const tokenFromDb = await this.prismaService.token.findUnique({
        where: { token, type: 'ACCESS_TOKEN' },
      });

      if (!tokenFromDb) throw new UnauthorizedException('Invalid token.');

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
