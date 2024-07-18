import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { OauthService } from './oauth.service';

@Controller('oauth')
@ApiTags('OAuth')
@SkipAuth()
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Post('verify-code')
  @HttpCode(HttpStatus.OK)
  async verifyCode(@Query('code') code: string) {
    return await this.oauthService.verifyToken(code);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleOAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleOAuthCallback(@Res() res: Response, @User() user: any) {
    const code = await this.oauthService.oauthCallback(user);
    return res.redirect(
      `${process.env.BASE_CLIENT_URL}/oauth/callback?code=${code}`,
    );
  }
}
