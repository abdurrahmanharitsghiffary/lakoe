import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { selectUserSimplified } from '@/common/query/user.select';
import { PrismaService } from '@/common/services/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(response: CreateUserDto) {
    response.password = await bcrypt.hash(response.password, 10);

    const newUser = await this.prismaService.user.create({
      data: response,
      select: selectUserSimplified,
    });
    return newUser;
  }

  async findAll() {
    return await this.prismaService.user.findMany({
      select: selectUserSimplified,
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: selectUserSimplified,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
      select: selectUserSimplified,
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({
      where: { id },
      select: selectUserSimplified,
    });
  }
}
