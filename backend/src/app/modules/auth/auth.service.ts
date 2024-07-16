import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';

import { PrismaService } from 'src/common/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from './email.service';
import { TokenType } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private emailService: EmailService,
  ) {}
  async register({ fullName, username, phone, ...response }: CreateAuthDto) {
    response.password = await bcrypt.hash(response.password, 10);

    const userWithSameUsername = await this.prisma.profile.count({
      where: {
        username,
      },
    });

    if (userWithSameUsername != 0) {
      throw new BadRequestException(`Username already exists`);
    }

    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          ...response,
          profile: {
            create: {
              fullName,
              username,
              phone,
            },
          },
        },
        select: {
          id: true,
          role: true,
          profile: {
            select: {
              fullName: true,
              username: true,
              phone: true,
              profilePicture: true,
              birthDate: true,
            },
          },
        },
      });
      const payload = { id: user.id, role: user.role };

      const token = this.jwt.sign(payload);

      await tx.token.create({
        data: { token, type: 'ACCESS_TOKEN', userId: user.id, expiresAt: 0 },
      });

      return {
        user,
        token,
      };
    });
  }

  async login(response: LoginDto) {
    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          email: response.email,
        },
      });

      if (!user) {
        throw new NotFoundException(`User not found`);
      }

      const isMatch = await bcrypt.compare(response.password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException('Invalid password');
      }

      const payload = { id: user.id, role: user.role };

      const token = this.jwt.sign(payload);

      await tx.token.create({
        data: { token, type: 'ACCESS_TOKEN', userId: user.id, expiresAt: 0 },
      });

      return {
        user,
        token,
      };
    });
  }

  async forgotPassword(email: string) {
    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException(`User not found`);
      }

      const token = uuidv4();
      const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60;

      await tx.token.create({
        data: {
          token,
          type: 'RESET_TOKEN',
          userId: user.id,
          expiresAt,
        },
      });

      this.emailService.sendResetPassword(email, token);

      return {
        user,
        token,
      };
    });
  }

  async resetPassword(token: string, newPassword: string) {
    return await this.prisma.$transaction(async (tx) => {
      const resetToken = await tx.token.findUnique({
        where: {
          token,
        },
      });

      if (
        !resetToken ||
        resetToken.type !== TokenType.RESET_TOKEN ||
        resetToken.expiresAt < Math.floor(Date.now() / 1000) ||
        resetToken.revokedAt
      ) {
        throw new UnauthorizedException('invalid expires reset password');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await tx.user.update({
        where: {
          id: resetToken.userId,
        },
        data: {
          password: hashedPassword,
        },
      });

      await tx.token.update({
        where: {
          id: resetToken.id,
        },
        data: {
          revokedAt: new Date(),
        },
      });
      return {
        resetToken,
      };
    });
  }
}
