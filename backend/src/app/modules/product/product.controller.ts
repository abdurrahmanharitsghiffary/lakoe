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
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { parseStringBool } from 'src/common/utils/parse-string-bool';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';
import { GetProductsSchema, getProductsSchema } from './schema/get-products';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/common/services/cloudinary.service';
import { User } from '../../../common/decorators/user';
import { UserPayload } from 'src/common/types';
import { PrismaService } from 'src/common/services/prisma.service';
import { ProductGuard } from './guards/product.guard';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images[]', 5))
  async create(
    @User() user: UserPayload,
    @UploadedFiles() uploadedImages: Express.Multer.File[] = [],
    @Body(new ZodValidationPipe(createProductSchema))
    createProductDto: CreateProductDto,
  ) {
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
  @UseGuards(ProductGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateProductSchema))
    updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(ProductGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
