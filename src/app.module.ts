import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { RedisModule } from './redis/redis.module';
import { ModulesModule } from './modules/modules.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

@Module({
  imports: [
    RedisModule,
    ModulesModule,
    DatabaseModule,
    ConfigModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },{
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ],
})
export class AppModule {}
