import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { SkuService } from './sku.service';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiJwtBearerAuth } from 'src/common/decorators/jwt-bearer.decorator';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';
import { SkuGuard } from './guards/sku.guard';
import { ProductGuard } from '../product/guards/product.guard';

@ApiTags('Skus')
@Controller()
export class SkuController {
  constructor(private readonly skuService: SkuService) {}

  @Get('stores/:id/skus')
  @SkipAuth()
  findAllByStoreId(@Param('id', ParseIntPipe) id: number) {
    return this.skuService.findAllByStoreId(id);
  }

  @ApiJwtBearerAuth()
  @Post('products/:id/skus')
  @UseGuards(ProductGuard)
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() createSkuSchema: CreateSkuDto,
  ) {
    return this.skuService.create(id, createSkuSchema);
  }

  @Get('skus')
  @SkipAuth()
  findAll() {
    return this.skuService.findAll();
  }

  @Get('skus/:id')
  @SkipAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.skuService.findOne(id);
  }

  @Patch('skus/:id')
  @ApiJwtBearerAuth()
  @UseGuards(SkuGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSkuDto: UpdateSkuDto,
  ) {
    return this.skuService.update(id, updateSkuDto);
  }

  @Delete('skus/:id')
  @ApiJwtBearerAuth()
  @UseGuards(SkuGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.skuService.remove(id);
  }
}
