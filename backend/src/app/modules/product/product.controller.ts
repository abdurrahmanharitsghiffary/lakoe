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
  UseGuards,
  BadRequestException,
  HttpStatus,
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
import { ZodValidationPipe } from '@/common/pipes/zod-validation/zod-validation.pipe';
import { SkipAuth } from '@/common/decorators/skip-auth/skip-auth.decorator';
import { GetProductOption, getProductsSchema } from './schema/get-products.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '@/common/services/cloudinary.service';
import { User } from '../../../common/decorators/user.decorator';
import { UserPayload } from '@/common/types';
import { PrismaService } from '@/common/services/prisma.service';
import { ProductGuard } from './guards/product.guard';
import { ApiTags } from '@nestjs/swagger';
import { ApiJwtBearerAuth } from '@/common/decorators/jwt-bearer.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiJwtBearerAuth()
  @UseInterceptors(FilesInterceptor('images[]', 5))
  async create(
    @User() user: UserPayload,
    @UploadedFiles() uploadedImages: Express.Multer.File[] = [],
    @Body(new ZodValidationPipe(createProductSchema))
    createProductDto: CreateProductDto,
  ) {
    console.log(createProductDto, 'DTO');
    console.log(user, 'USER ');
    let uploadedImageSecureUrl: string[];

    const store = await this.prismaService.store.findUnique({
      where: { userId: user?.id },
    });

    if (!store)
      throw new BadRequestException(
        'You must create a store to upload products.',
      );

    if (uploadedImages.length > 0) {
      const images = await Promise.all(
        uploadedImages.map((image) =>
          this.cloudinaryService.uploadStream(image.buffer),
        ),
      );

      uploadedImageSecureUrl = images.map((image) => image.secure_url);
    }

    return await this.productService.create(store.id, {
      ...createProductDto,
      images: uploadedImageSecureUrl,
    });
  }

  @Get()
  @SkipAuth()
  findAll(
    @Query(new ZodValidationPipe(getProductsSchema))
    options: GetProductOption,
  ) {
    return this.productService.search(options);
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiJwtBearerAuth()
  @Patch(':id')
  @UseGuards(ProductGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateProductSchema))
    updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiJwtBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(ProductGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
