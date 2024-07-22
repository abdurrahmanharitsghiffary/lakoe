import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { document } from './common/libs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('/api/v1');

  SwaggerModule.setup('docs', app, document(app), {
    useGlobalPrefix: true,
    jsonDocumentUrl: '/api-json',
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(3000);
}
bootstrap();
