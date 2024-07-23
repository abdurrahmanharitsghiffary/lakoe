import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { StoreService } from './store.service';
import {
  CreateStoreDto,
  createStoreSchema,
  GetShippingRatesDto,
} from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { User } from '../../../common/decorators/user.decorator';
import { UserPayload } from 'src/common/types';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { CloudinaryService } from 'src/common/services/cloudinary.service';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '../product/product.service';
import { OrderService } from '../order/order.service';
import { FindAllOptions } from '../order/dto/index.dto';
import { ApiJwtBearerAuth } from 'src/common/decorators/jwt-bearer.decorator';
import { StoreGuard } from './guards/store.guard';
import { AddCourierDto } from './dto/add-courier.dto';
import {
  DeleteCourierServiceDto,
  deleteCourierServiceSchema,
} from './dto/delete-courier.dto';

@ApiTags('Stores')
@Controller('stores')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
  ) {}

  @ApiJwtBearerAuth()
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
    ]),
  )
  async create(
    @User() user: UserPayload,
    @Body(new ZodValidationPipe(createStoreSchema))
    createStoreDto: CreateStoreDto,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    },
  ) {
    let logoSrc: string;
    if (files?.logo?.[0]?.buffer) {
      const uploadedLogo = await this.cloudinaryService.uploadStream(
        files?.logo?.[0]?.buffer,
      );
      logoSrc = uploadedLogo?.secure_url;
    }

    let bannerSrc: string;
    if (files?.banner?.[0]?.buffer) {
      const uploadedBanner = await this.cloudinaryService.uploadStream(
        files?.banner?.[0]?.buffer,
      );
      bannerSrc = uploadedBanner?.secure_url;
    }

    return this.storeService.create(user.id, {
      ...createStoreDto,
      bannerAttachment: bannerSrc,
      logoAttachment: logoSrc,
    });
  }

  @ApiJwtBearerAuth()
  @Get(':id/orders')
  @UseGuards(StoreGuard)
  async findOrdersByStoreId(
    @Param('id') id: string,
    @Query() options: FindAllOptions,
  ) {
    return this.orderService.findAllByStoreId(+id, options);
  }

  @Get(':id/products')
  @SkipAuth()
  async findAllByStoreId(@Param('id') id: string) {
    console.log(id, 'STORE ID');
    return this.productService.findAllByStoreId(+id);
  }

  @Post(':id/shipping-rates')
  @HttpCode(HttpStatus.OK)
  @SkipAuth()
  async getStoreShippingRates(
    @Body() getShippingRateDto: GetShippingRatesDto,
    @Param('id') id: string,
  ) {
    return this.storeService.getShippingRates(
      +id,
      getShippingRateDto.address,
      getShippingRateDto.skus,
    );
  }

  @Get()
  @SkipAuth()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @ApiJwtBearerAuth()
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(StoreGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
    ]),
  )
  async update(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    },
  ) {
    let logoSrc: string;
    if (files?.logo?.[0]?.buffer) {
      const uploadedLogo = await this.cloudinaryService.uploadStream(
        files?.logo?.[0]?.buffer,
      );
      logoSrc = uploadedLogo?.secure_url;
    }

    let bannerSrc: string;
    if (files?.banner?.[0]?.buffer) {
      const uploadedBanner = await this.cloudinaryService.uploadStream(
        files?.banner?.[0]?.buffer,
      );
      bannerSrc = uploadedBanner?.secure_url;
    }

    return this.storeService.update(+id, {
      ...updateStoreDto,
      bannerAttachment: bannerSrc,
      logoAttachment: logoSrc,
    });
  }

  @ApiJwtBearerAuth()
  @Delete(':id')
  @UseGuards(StoreGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }

  @ApiJwtBearerAuth()
  @Put(':id/couriers')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(StoreGuard)
  async addCouriers(
    @Param('id') id: string,
    @Body() addCourierDto: AddCourierDto,
  ) {
    return this.storeService.addCourierService(+id, addCourierDto);
  }

  @ApiJwtBearerAuth()
  @Delete(':id/couriers')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(StoreGuard)
  async deleteCouriers(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(deleteCourierServiceSchema))
    deleteCourierServiceDto: DeleteCourierServiceDto,
  ) {
    return this.storeService.removeCourierService(
      +id,
      deleteCourierServiceDto.courierServiceIds,
    );
  }

  @ApiJwtBearerAuth()
  @Get(':id/couriers')
  @UseGuards(StoreGuard)
  async findAllCourierServices(@Param('id') id: string) {
    return this.storeService.findAllCourierServices(+id);
  }
}
