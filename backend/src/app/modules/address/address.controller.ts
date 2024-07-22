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
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import {
  CreateAddressDto,
  createAddressSchema,
} from './dto/create-address.dto';
import {
  UpdateAddressDto,
  updateAddressSchema,
} from './dto/update-address.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { AddressGuard } from './guards/address.guard';
import { StoreGuard } from '../store/guards/store.guard';
import { StoreService } from '../store/store.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiJwtBearerAuth } from 'src/common/decorators/jwt-bearer.decorator';

@ApiTags('Address')
@ApiJwtBearerAuth()
@Controller()
export class AddressController {
  constructor(
    private readonly storeService: StoreService,
    private readonly addressService: AddressService,
  ) {}

  @Post('stores/:id/address')
  @UseGuards(StoreGuard)
  async create(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(createAddressSchema))
    createAddressDto: CreateAddressDto,
  ) {
    return this.addressService.create(+id, createAddressDto);
  }

  @Get('stores/:id/address')
  @UseGuards(StoreGuard)
  async findAllAddressByStoreId(@Param('id') id: string) {
    await this.storeService.findOne(+id);
    return this.addressService.findAllByStoreId(+id);
  }

  @Get('address/:id')
  @UseGuards(AddressGuard)
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch('address/:id')
  @UseGuards(AddressGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateAddressSchema))
    updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete('address/:id')
  @UseGuards(AddressGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
