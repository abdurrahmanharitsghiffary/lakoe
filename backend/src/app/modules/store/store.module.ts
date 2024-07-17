import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { ProductService } from '../product/product.service';

@Module({
  controllers: [StoreController],
  providers: [StoreService, ProductService],
})
export class StoreModule {}
