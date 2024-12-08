import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import {
  CreateTemplateDto,
  createTemplateMessageSchema,
} from './dto/create-template.dto';
import {
  UpdateTemplateDto,
  updateTemplateMessageSchema,
} from './dto/update-template.dto';
import { ZodValidationPipe } from '@/common/pipes/zod-validation/zod-validation.pipe';
import { TemplateGuard } from './guards/template.guard';
import { StoreGuard } from '../store/guards/store.guard';
import { StoreService } from '../store/store.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiJwtBearerAuth } from '@/common/decorators/jwt-bearer.decorator';

@Controller()
@ApiJwtBearerAuth()
@ApiTags('Templates')
export class TemplateController {
  constructor(
    private readonly templateService: TemplateService,
    private readonly storeService: StoreService,
  ) {}

  @Post('stores/:id/templates')
  @UseGuards(StoreGuard)
  create(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(createTemplateMessageSchema))
    createTemplateDto: CreateTemplateDto,
  ) {
    return this.templateService.create(+id, createTemplateDto);
  }

  @Get('stores/:id/templates')
  @UseGuards(StoreGuard)
  async findAll(@Param('id') id: string) {
    await this.storeService.findOne(+id);
    return this.templateService.findAllByStoreId(+id);
  }

  @Get('templates/:id')
  @UseGuards(TemplateGuard)
  findOne(@Param('id') id: string) {
    return this.templateService.findOne(+id);
  }

  @Patch('templates/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(TemplateGuard)
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateTemplateMessageSchema))
    updateTemplateDto: UpdateTemplateDto,
  ) {
    return this.templateService.update(+id, updateTemplateDto);
  }

  @Delete('templates/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(TemplateGuard)
  remove(@Param('id') id: string) {
    return this.templateService.remove(+id);
  }
}
