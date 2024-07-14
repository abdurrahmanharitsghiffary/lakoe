import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ProductModule } from './modules/product/product.module';
import { UsersModule } from './modules/users/users.module';
import { OrderModule } from './modules/order/order.module';
import { PrismaService } from 'src/common/services/prisma.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [CommonModule, ProductModule, UsersModule, OrderModule, AuthModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
