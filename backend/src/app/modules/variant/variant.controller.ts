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
  HttpCode,
  HttpStatus,
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
import { ParentVariantGuard } from './guards/parent-variant.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Variants')
export class VariantController {
  constructor(
    private readonly variantService: VariantService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('variants')
  @UseGuards(ProductGuard)
  @UseGuards(ParentVariantGuard)
  async create(
    @Body(new ZodValidationPipe(createVariantSchema))
    createVariantDto: CreateVariantDto,
  ) {
    const errors = [];

    const variants = await this.prismaService.variant.findMany({
      where: {
        name: { in: createVariantDto.variants.map((variant) => variant.name) },
      },
      select: { name: true },
    });

    const vNames = variants.map((v) => v.name);

    createVariantDto.variants.forEach((variant) => {
      if (vNames.includes(variant.name))
        errors.push({ name: variant.name, message: 'Variant already exists.' });
    });

    console.log(errors, 'ERROR');

    if (errors.length > 0)
      throw new ConflictException({
        errors,
        message: 'CONFLICT',
        statusCode: 409,
        success: false,
      });

    return this.variantService.createMany(createVariantDto);
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(VariantGuard)
  async update(
    @Param('id') id: string,
    @Body() updateVariantDto: UpdateVariantDto,
  ) {
    await this.variantService.findOne(+id);
    return this.variantService.update(+id, updateVariantDto);
  }

  @Delete('variants/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(VariantGuard)
  async remove(@Param('id') id: string) {
    await this.variantService.findOne(+id);
    return this.variantService.remove(+id);
  }
}
