import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AddressService } from '../address/address.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, AddressService],
})
export class OrderModule {}
