import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const BEARER_AUTH_NAME = 'JWT';

const config = new DocumentBuilder()
  .setTitle('Lakoe Api')
  .setDescription('Lakoe is a ecommerce platform for buy and sell products')
  .setVersion('1.0')
  .setContact(
    'Abdurrahman Harits Ghiffary',
    'https://github.com/abdurrahmanharitsghiffary',
    'abdmanharits@gmail.com',
  )
  .addTag('Products')
  .addTag('Address')
  .addTag('Skus')
  .addTag('Carts')
  .addTag('Me')
  .addTag('Auth')
  .addTag('Orders')
  .addTag('Payments')
  .addTag('Stores')
  .addTag('Templates')
  .addTag('Users')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
    BEARER_AUTH_NAME,
  )
  .build();

export const document = (app: INestApplication<any>) =>
  SwaggerModule.createDocument(app, config);
