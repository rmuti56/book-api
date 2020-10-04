import { LoggerService, Injectable, Scope } from '@nestjs/common';
import { createLogger, Logger, transports } from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger implements LoggerService {
  private context?: string;
  private winstonLogger: Logger;

  public setContext(context: string) {
    this.context = context;
  }

  constructor() {
    this.winstonLogger = createLogger({
      transports: [
        new transports.File({ filename: 'logs/log' }),
        new transports.Console(),
        new ElasticsearchTransport({
          clientOpts: {
            node: 'http://localhost:9200',
            name: 'elasticsearch'
          },
        
        }),
      ],
    });
  }

  log(message: any, context?: string) {
    return this.winstonLogger.info(message, {
      context: context || this.context,
    });
  }

  error(message: any, trace?: string, context?: string): any {
    return this.winstonLogger.error(message, {
      trace,
      context: context || this.context,
    });
  }

  warn(message: any, context?: string): any {
    return this.winstonLogger.warn(message, {
      context: context || this.context,
    });
  }

  debug(message: any, context?: string): any {
    return this.winstonLogger.debug(message, {
      context: context || this.context,
    });
  }

  verbose(message: any, context?: string): any {
    return this.winstonLogger.verbose(message, {
      context: context || this.context,
    });
  }
}
