import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { UsersModule } from './modules/users/users.module';
import { OrderModule } from './modules/order/order.module';
import { AuthModule } from './modules/auth/auth.module';
import { StoreModule } from './modules/store/store.module';
import { MeModule } from './modules/me/me.module';
import { OauthModule } from './modules/oauth/oauth.module';
import { CronModule } from './modules/cron/cron.module';
import { PaymentModule } from './modules/payment/payment.module';
import { AppController } from './app.controller';
import { AddressModule } from './modules/address/address.module';
import { TemplateModule } from './modules/template/template.module';
import { CommonModule } from 'src/common/common.module';
import { CartModule } from './modules/cart/cart.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    OrderModule,
    StoreModule,
    CommonModule,
    ProductModule,
    UsersModule,
    AuthModule,
    MeModule,
    OauthModule,
    CronModule,
    PaymentModule,
    AddressModule,
    TemplateModule,
    CartModule,
    CategoryModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
