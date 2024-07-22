import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';
import { PrismaService } from 'src/common/services/prisma.service';

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
    const categories = await this.prismaService.category.findMany({
      where: { name: { contains: q } },
      orderBy: [{ id: 'desc' }],
      select: { name: true },
    });

    return categories.map((category) => category.name);
  }
}
