import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ProductModule } from './modules/product/product.module';
import { CrudModule } from './modules/crud/crud.module';
import { CrudModule } from './modules/crud/crud.module';

@Module({
  imports: [CommonModule, ProductModule, CrudModule],
})
export class AppModule {}
