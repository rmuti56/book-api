import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Swagger } from './common/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  new Swagger(app)

  await app.listen(5000);
}
bootstrap();
