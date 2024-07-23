import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { ProductService } from '../product/product.service';
import { OrderService } from '../order/order.service';
import { AddressService } from '../address/address.service';

@Module({
  controllers: [StoreController],
  providers: [StoreService, ProductService, OrderService, AddressService],
})
export class StoreModule {}
