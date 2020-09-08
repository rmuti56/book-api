import { NestFactory } from '@nestjs/core';
import { start } from 'elastic-apm-node';

import { AppModule } from './app.module';
import { Swagger } from './common/swagger';

async function bootstrap() {
  start({
    serviceName: process.env.PROJECT_NAME,
    serverUrl: process.env.ELASTIC_APM_SERVER_URL,
    secretToken: process.env.ELASTIC_APM_SECRET_TOKEN
  });

  const app = await NestFactory.create(AppModule);
  app.enableCors()
  new Swagger(app);

  await app.listen(5000);
}
bootstrap();
