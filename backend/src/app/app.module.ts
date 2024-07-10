import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ProductModule } from './modules/product/product.module';
<<<<<<< HEAD
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [CommonModule, ProductModule, UsersModule],
=======

@Module({
  imports: [CommonModule, ProductModule],
>>>>>>> 71bc6615577c6d8475a4fcbe2b14ae941044b49a
})
export class AppModule {}
