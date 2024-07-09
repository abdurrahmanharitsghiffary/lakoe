import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [CommonModule, ProductModule],
})
export class AppModule {}
