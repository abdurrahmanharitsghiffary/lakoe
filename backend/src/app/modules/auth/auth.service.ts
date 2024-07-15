import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async register(response: CreateAuthDto) {
    const userWithSameEmail = await this.prisma.user.count({
      where: {
        email: response.email,
      },
    });

    if (userWithSameEmail != 0) {
      throw new HttpException(`Email already exists`, 400);
    }

    response.password = await bcrypt.hash(response.password, 10);

    return await this.prisma.user.create({
      data: response,
    });
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
