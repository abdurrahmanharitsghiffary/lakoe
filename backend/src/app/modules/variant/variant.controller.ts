import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ConflictException,
} from '@nestjs/common';
import { VariantService } from './variant.service';
import {
  CreateVariantDto,
  createVariantSchema,
} from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { VariantGuard } from './guards/variant.guard';
import { ProductGuard } from './guards/product.guard';
import { PrismaService } from 'src/common/services/prisma.service';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';

@Controller()
export class VariantController {
  constructor(
    private readonly variantService: VariantService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('variants')
  @UseGuards(ProductGuard)
  async create(
    @Body(new ZodValidationPipe(createVariantSchema))
    createVariantDto: CreateVariantDto,
  ) {
    const variant = await this.prismaService.variant.count({
      where: { name: createVariantDto.name },
    });

    if (variant > 0) throw new ConflictException('Variant already created.');

    return this.variantService.create(createVariantDto);
  }

  @Get('products/:productId/variants')
  @SkipAuth()
  findAll(@Param('productId') productId: string) {
    return this.variantService.findAll(+productId);
  }

  @Get('variants/:id')
  @SkipAuth()
  findOne(@Param('id') id: string) {
    return this.variantService.findOne(+id);
  }

  @Patch('variants/:id')
  @UseGuards(VariantGuard)
  update(@Param('id') id: string, @Body() updateVariantDto: UpdateVariantDto) {
    return this.variantService.update(+id, updateVariantDto);
  }

  @Delete('variants/:id')
  @UseGuards(VariantGuard)
  remove(@Param('id') id: string) {
    return this.variantService.remove(+id);
  }
}
