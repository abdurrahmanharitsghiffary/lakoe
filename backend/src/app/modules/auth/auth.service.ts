import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';

import { PrismaService } from 'src/common/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async register({
    fullName,
    username,
    phone,
    profilePicture,
    birthDate,
    ...response
  }: CreateAuthDto) {
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
              profilePicture,
              birthDate,
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
}
