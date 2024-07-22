import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { OrderService } from '../order/order.service';
import { AddressService } from '../address/address.service';
import { StoreService } from '../store/store.service';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService, OrderService, AddressService, StoreService],
})
export class WebhookModule {}
