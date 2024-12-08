import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/common/services/prisma.service';
import { UserPayload } from '@/common/types';
import * as crypto from 'crypto';

@Injectable()
export class OauthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async verifyToken(code: string) {
    const c = await this.prismaService.code.findUnique({
      where: { code },
      select: { token: { select: { token: true } }, id: true },
    });

    if (!c) throw new UnauthorizedException('Invalid code.');
    console.log(c, 'CODAS');
    await this.prismaService.code.delete({
      where: { code },
    });

    return c.token;
  }

  async oauthCallback(user: UserPayload) {
    console.log(user, 'USER');
    const token = await this.jwtService.signAsync({
      id: user?.id,
      role: user?.role,
      storeId: user?.storeId,
    });

    const accessToken = await this.prismaService.token.create({
      data: {
        token,
        userId: user?.id,
        type: 'ACCESS_TOKEN',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        codes: { create: { code: crypto.randomBytes(10).toString('hex') } },
      },
      select: { codes: { take: 1, select: { code: true } } },
    });
    console.log(accessToken, 'ACCESS TOKEN');

    return { code: accessToken?.codes?.[0]?.code };
  }
}
