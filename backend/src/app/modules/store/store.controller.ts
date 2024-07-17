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
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto, createStoreSchema } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { User } from '../../../common/decorators/user';
import { UserPayload } from 'src/common/types';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { CloudinaryService } from 'src/common/services/cloudinary.service';
import { Roles } from 'src/common/decorators/roles/roles';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stores')
@Controller('stores')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
    ]),
  )
  @Roles(['ADMIN'])
  async update(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    },
  ) {
    await this.storeService.findOne(+id);
    console.log(updateStoreDto, 'UPDATE STORE DTO');
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

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(['ADMIN'])
  async remove(@Param('id') id: string) {
    await this.storeService.findOne(+id);
    return this.storeService.remove(+id);
  }
}
