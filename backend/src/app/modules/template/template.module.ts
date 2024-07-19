import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { StoreService } from '../store/store.service';

@Module({
  controllers: [TemplateController],
  providers: [TemplateService, StoreService],
})
export class TemplateModule {}
