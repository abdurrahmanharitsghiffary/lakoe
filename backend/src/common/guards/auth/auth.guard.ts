import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { $Enums } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from '@/common/services/prisma.service';

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
    // if (APP_CONFIG.TESTING.DISABLE_AUTH_IN_DEV) {
    //   console.log(APP_CONFIG, 'AP CINFIG');
    //   if (APP_CONFIG.TESTING.LOGIN_AS.USER_2)
    //     request.user = { id: 2, role: 'ADMIN' };

    //   if (APP_CONFIG.TESTING.LOGIN_AS.USER_1_NOT_ADMIN)
    //     request.user = { id: 1, role: 'USER' };

    //   if (APP_CONFIG.TESTING.LOGIN_AS.USER_1)
    //     request.user = { id: 1, role: 'ADMIN' };
    //   return true;
    // }

    if (skipAuth && !authOptional) return true;

    const token = this.getTokenFromHeaders(request, authOptional);

    try {
      const decoded = await this.jwtService.verifyAsync<{
        id: number;
        role: $Enums.Role;
      }>(token);

      const tokenFromDb = await this.prismaService.token.findUnique({
        where: { token, type: 'ACCESS_TOKEN' },
      });
      console.log('Db:', tokenFromDb);
      if (!tokenFromDb) throw new ForbiddenException('Invalid token.');

      request.user = decoded;
    } catch (err) {
      if (authOptional) return true;
      throw err;
    }

    return true;
  }

  getTokenFromHeaders(request: Request, authOptional: boolean) {
    const [tokenType, token] = (request.headers['authorization'] ?? '').split(
      ' ',
    );

    if (!token && !authOptional)
      throw new ForbiddenException('No token provided.');
    if (tokenType !== 'Bearer' && !authOptional)
      throw new ForbiddenException('Invalid token type.');

    return token;
  }
}
