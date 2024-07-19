import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { StoreService } from '../store/store.service';

@Module({
  controllers: [AddressController],
  providers: [AddressService, StoreService],
})
export class AddressModule {}
