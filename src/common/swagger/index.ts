import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class Swagger {
  constructor(app: INestApplication) {
    const configService = app.get(ConfigService);
    const isDevelopment =
      configService.get<string>('NODE_ENV') === 'development';
    if (isDevelopment) {
      const options = new DocumentBuilder()
        .setTitle(`${configService.get('PROJECT_NAME')}`)
        .setDescription(
          `The ${configService.get('PROJECT_NAME')} API description`,
        )
        .setVersion('1.0')
        .addBearerAuth(
          { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
          'Authorization',
        )
        .build();

      const document = SwaggerModule.createDocument(app, options);
      SwaggerModule.setup('api-doc', app, document);
    }
  }
}
