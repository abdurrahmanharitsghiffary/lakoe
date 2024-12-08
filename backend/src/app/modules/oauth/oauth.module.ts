import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

@Module({
  imports: [PassportModule],
  providers: [GoogleStrategy, OauthService],
  controllers: [OauthController],
})
export class OauthModule {}
