import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async register(response: CreateUserDto) {
    const userWithSameEmail = await this.prisma.user.count({
      where: {
        email: response.email,
      },
    });

    if (userWithSameEmail != 0) {
      throw new HttpException(`Email already exists`, 400);
    }

    response.password = await bcrypt.hash(response.password, 10);

    const user = await this.prisma.user.create({
      data: response,
    });

    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
