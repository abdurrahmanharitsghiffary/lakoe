import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  createProductSchema,
} from './dto/create-product.dto';
import {
  UpdateProductDto,
  updateProductSchema,
} from './dto/update-product.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { z } from 'zod';
import { parseStringBool } from 'src/common/utils/parse-string-bool';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';
import { GetProductsSchema, getProductsSchema } from './schema/get-products';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createProductSchema))
    createProductDto: CreateProductDto,
  ) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  @SkipAuth()
  findAll(
    @Query(new ZodValidationPipe(getProductsSchema))
    { active, q }: GetProductsSchema,
  ) {
    return this.productService.search(q, parseStringBool(active));
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateProductSchema))
    updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
