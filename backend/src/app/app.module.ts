import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ProductModule } from './modules/product/product.module';
import { UsersModule } from './modules/users/users.module';
import { OrderModule } from './modules/order/order.module';
import { AuthModule } from './modules/auth/auth.module';
import { StoreModule } from './modules/store/store.module';
import { VariantModule } from './modules/variant/variant.module';
import { MeController } from './modules/me/me.controller';
import { MeService } from './modules/me/me.service';
import { MeModule } from './modules/me/me.module';

@Module({
  imports: [
    CommonModule,
    ProductModule,
    UsersModule,
    OrderModule,
    AuthModule,
    StoreModule,
    VariantModule,
    MeModule,
  ],
  controllers: [MeController],
  providers: [MeService],
})
export class AppModule {}
