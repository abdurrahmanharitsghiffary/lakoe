import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly prismaService: PrismaService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_API_URL}/oauth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const email = profile.emails?.[0]?.value;
      console.log(profile, 'PROFILE');
      const user = await this.prismaService.user.findUnique({
        where: { email },
        select: { providerType: true, id: true, role: true },
      });

      if (!user) {
        let uniqueUsername =
          profile?.username ??
          profile?.displayName?.split(' ')?.join('')?.toLowerCase() ??
          (profile?.name?.givenName + profile?.name?.familyName)
            ?.split(' ')
            ?.join('')
            ?.toLowerCase();

        const usernameIsExists = await this.prismaService.profile.findUnique({
          where: { username: uniqueUsername },
        });

        if (usernameIsExists) {
          uniqueUsername += Date.now().toString();
        }

        const data: Prisma.UserCreateInput = {
          isVerified: true,
          password: '',
          email,
          providerType: 'GOOGLE',
          providerId: profile.id,
        };

        const newUser = await this.prismaService.user.create({
          data: {
            ...data,
            profile: {
              create: {
                fullName: profile?.displayName,
                username: uniqueUsername,
              },
            },
          },
        });

        return done(null, newUser);
      }

      done(null, user);
    } catch (err) {
      done(new UnauthorizedException(err?.message), false);
    }
  }
}