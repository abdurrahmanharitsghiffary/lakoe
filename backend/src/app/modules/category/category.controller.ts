import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async findAll(@Query('q') q: string) {
    const categories = await this.prismaService.category.findMany({
      where: { name: { contains: q } },
      orderBy: [{ id: 'desc' }],
      select: { name: true },
    });

    return categories.map((category) => category.name);
  }
}
