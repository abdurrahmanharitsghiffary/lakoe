import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateStoreDto } from '../store/dto/update-store.dto';
import { CloudinaryService } from 'src/common/services/cloudinary.service';
import { StoreService } from '../store/store.service';
import { User } from 'src/common/decorators/user.decorator';
import { UserPayload } from 'src/common/types';
import { PrismaService } from 'src/common/services/prisma.service';
import { selectUser } from 'src/common/query/user.select';
import { ApiTags } from '@nestjs/swagger';
import { ApiJwtBearerAuth } from 'src/common/decorators/jwt-bearer.decorator';
import { omitProperties } from 'src/common/utils/omit-properties';

@ApiTags('Me')
@ApiJwtBearerAuth()
@Controller('me')
export class MeController {
  constructor(
    private readonly storeService: StoreService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  async getProfile(@User() user: UserPayload) {
    const me = await this.prismaService.user.findUnique({
      where: { id: user?.id },
      select: { ...selectUser, store: { select: { id: true } } },
    });

    return {
      ...omitProperties(me, ['store']),
      hasStore: me?.store?.id !== null,
      storeId: me?.store?.id,
    };
  }

  @Get('stores')
  async getStore(@User() user: UserPayload) {
    return this.storeService.findOneByUserId(user?.id);
  }

  @Patch('stores')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
    ]),
  )
  async updateStore(
    @User() user: UserPayload,
    @Body() updateStoreDto: UpdateStoreDto,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    },
  ) {
    const store = await this.findStore(user);

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

    return this.storeService.update(+store.id, {
      ...updateStoreDto,
      bannerAttachment: bannerSrc,
      logoAttachment: logoSrc,
    });
  }

  @Delete('stores')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@User() user: UserPayload) {
    const store = await this.findStore(user);
    return this.storeService.remove(+store.id);
  }

  async findStore(user: UserPayload) {
    const store = await this.prismaService.store.findFirst({
      where: { userId: user?.id },
    });

    if (!store)
      throw new BadRequestException(
        'Store not found. Please ensure you have created a store before attempting to update or delete.',
      );

    return store;
  }
}
