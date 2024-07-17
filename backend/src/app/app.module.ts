import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { UsersModule } from './modules/users/users.module';
import { OrderModule } from './modules/order/order.module';
import { AuthModule } from './modules/auth/auth.module';
import { StoreModule } from './modules/store/store.module';
import { VariantModule } from './modules/variant/variant.module';
import { MeModule } from './modules/me/me.module';
import { OauthModule } from './modules/oauth/oauth.module';
import { CronModule } from './modules/cron/cron.module';
import { PaymentModule } from './modules/payment/payment.module';
import { AppController } from './app.controller';
import { AddressModule } from './modules/address/address.module';
import { TemplateModule } from './modules/template/template.module';
import { CommonModule } from 'src/common/common.module';

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
    OauthModule,
    CronModule,
    PaymentModule,
    AddressModule,
    TemplateModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
