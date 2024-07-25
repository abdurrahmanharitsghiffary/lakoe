import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';
import { PrismaService } from 'src/common/services/prisma.service';

export const selectCategories = {
  _count: { select: { subCategories: true } },
  id: true,
  name: true,
} satisfies Prisma.CategorySelect;

@Controller('categories')
@SkipAuth()
export class CategoryController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @ApiQuery({ required: false, name: 'q' })
  async findAll(
    @Query('q')
    q?: string,
  ) {
    return await this.prismaService.category.findMany({
      where: { name: { contains: q } },
      orderBy: [{ id: 'desc' }],
      select: selectCategories,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.prismaService.category.findUnique({
      where: { id: +id },
      select: {
        ...selectCategories,
        subCategories: { select: selectCategories },
      },
    });
  }
}
