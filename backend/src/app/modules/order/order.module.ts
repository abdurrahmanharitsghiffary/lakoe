import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AddressService } from '../address/address.service';
import { StoreService } from '../store/store.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, AddressService, StoreService],
})
export class OrderModule {}
