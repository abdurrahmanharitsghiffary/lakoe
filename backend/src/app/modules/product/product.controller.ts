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
  UseInterceptors,
  UploadedFiles,
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
import { parseStringBool } from 'src/common/utils/parse-string-bool';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';
import { GetProductsSchema, getProductsSchema } from './schema/get-products';
import { IsGuardProduct } from './decorators/is-guard-product';
import { FilesInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { GetImageDataURI } from 'src/common/pipes/get-data-uri/get-data-uri.pipe';
import { CloudinaryService } from 'src/common/services/cloudinary.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images[]', 5))
  async create(
    @UploadedFiles(GetImageDataURI) uploadedImages: string[],
    @Body(new ZodValidationPipe(createProductSchema))
    createProductDto: CreateProductDto,
  ) {
    console.log(uploadedImages, 'UPLOADED IMAGES[]');
    let uploadedImageSecureUrl: string[];
    if (uploadedImages.length > 0) {
      const images = await Promise.all(
        uploadedImages.map((image) => this.cloudinaryService.upload(image)),
      );

      uploadedImageSecureUrl = images.map((image) => image.secure_url);
    }

    return await this.productService.create({
      ...createProductDto,
      attachments: uploadedImageSecureUrl,
    });
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
  @IsGuardProduct()
  @HttpCode(204)
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateProductSchema))
    updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @IsGuardProduct()
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
