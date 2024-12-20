import * as moduleAlias from 'module-alias';
import * as path from 'path';

const ROOT_SRC = path.join(__dirname, '../src');

console.log(ROOT_SRC);

moduleAlias.addAlias('@', ROOT_SRC);

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { document } from '@/common/libs/swagger';
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
