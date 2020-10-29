import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import { Swagger } from './common/swagger';
import { AppLogger } from './logger/logger.service';


async function bootstrap() {

  const app = await NestFactory.create(AppModule,);
  app.use(RequestIdMiddleware)
  app.useLogger(new AppLogger())
  app.enableCors();
  new Swagger(app);

  await app.listen(5000);
}
bootstrap();
