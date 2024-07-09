import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  createProductSchema,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createProductSchema))
    createProductDto: CreateProductDto,
  ) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(204)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    // if()throw new NotFoundException()
    return {
      // success:false,
      data: this.productService.update(+id, updateProductDto),
      message: '',
    };
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
