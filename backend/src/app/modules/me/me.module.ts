import { Module } from '@nestjs/common';
import { StoreService } from '../store/store.service';
import { MeController } from './me.controller';
import { MeService } from './me.service';

@Module({ providers: [StoreService, MeService], controllers: [MeController] })
export class MeModule {}
