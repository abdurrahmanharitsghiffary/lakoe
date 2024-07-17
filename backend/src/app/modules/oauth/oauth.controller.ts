import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';
import { User } from 'src/common/decorators/user';
import { PrismaService } from 'src/common/services/prisma.service';
import * as crypto from 'crypto';
import { ApiTags } from '@nestjs/swagger';

@Controller('oauth')
@ApiTags('OAuth')
@SkipAuth()
export class OauthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('verify-code')
  @HttpCode(HttpStatus.OK)
  async verifyCode(@Query('code') code: string) {
    const c = await this.prismaService.code.findUnique({
      where: { code },
      select: { token: { select: { token: true } }, id: true },
    });
    console.log(code, 'CODE');
    if (!c) throw new UnauthorizedException('Invalid code.');

    await this.prismaService.code.delete({
      where: { code: code.toString() },
    });

    return c.token;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleOAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleOAuthCallback(@Res() res: Response, @User() user: any) {
    console.log(user, 'USER');
    const token = await this.jwtService.signAsync({
      id: user?.id,
      role: user?.role,
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
    return res.redirect(
      `${process.env.BASE_CLIENT_URL}/oauth/callback?code=${accessToken?.codes?.[0]?.code}`,
    );
  }
}
