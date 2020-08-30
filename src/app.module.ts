import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { RedisModule } from './redis/redis.module';
import { ModulesModule } from './modules/modules.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [RedisModule, ModulesModule, DatabaseModule, ConfigModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    
    },
  ],
})
export class AppModule {}
