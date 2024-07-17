import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Lakoe Api')
  .setDescription('Lakoe is a ecommerce platform for buy and sell products')
  .setVersion('1.0')
  .addTag('Products')
  .addTag('Address')
  .addTag('Variants')
  .addTag('Me')
  .addTag('Auth')
  .addTag('Orders')
  .addTag('Payments')
  .addTag('Stores')
  .addTag('Templates')
  .addTag('Users')
  .addBearerAuth()
  .build();

export const document = (app: INestApplication<any>) =>
  SwaggerModule.createDocument(app, config);
