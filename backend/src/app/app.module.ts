import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ProductModule } from './modules/product/product.module';
import { UsersModule } from './modules/users/users.module';

import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [CommonModule, ProductModule, UsersModule],
})
export class AppModule {}
