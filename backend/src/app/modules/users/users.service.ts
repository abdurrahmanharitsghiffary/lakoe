import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { selectUserSimplified } from 'src/common/query/user.select';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(response: CreateUserDto) {
    response.password = await bcrypt.hash(response.password, 10);

    const newUser = await this.prisma.user.create({
      data: response,
      select: selectUserSimplified,
    });
    return newUser;
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: selectUserSimplified,
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: selectUserSimplified,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
