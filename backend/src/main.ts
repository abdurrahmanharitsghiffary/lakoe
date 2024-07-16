import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { document } from './common/libs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('/api/v1');

  SwaggerModule.setup('docs', app, document(app), {
    useGlobalPrefix: true,
    explorer: true,
  });

  await app.listen(3000);
}
bootstrap();
