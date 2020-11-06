import { Injectable } from '@nestjs/common';
import { RedisClient, createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  private redisClient: RedisClient;

  // constructor(private configService: ConfigService) {
  //   this.redisClient = createClient({
  //     host: this.configService.get<string>('REDIS_HOST'),
  //     port: this.configService.get<number>('REDIS_PORT'),
  //     password: this.configService.get<string>('REDIS_PASSWORD'),
  //   });
  // }

  get(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.redisClient.get(key, (err, reply) => {
        if (err) {
          reject(err);
        }
        resolve(reply);
      });
    });
  }

  set(key: string, value: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.redisClient.set(key, value, (err, reply) => {
        if (err) {
          reject(err);
        }
        resolve(reply);
      });
    });
  }

  del(key: string | string[]): Promise<number> {
    return new Promise((resolve, reject) => {
      this.redisClient.del(key, (err, reply) => {
        if (err) {
          reject(err);
        }
        resolve(reply);
      });
    });
  }

  hmget(key: string, fields: string[]): Promise<string[] | null> {
    return new Promise((resolve, reject) => {
      this.redisClient.hmget(key, fields, (err, reply) => {
        if (err) {
          reject(err);
        }
        resolve(reply);
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  hmset(key: string, value: object) {
    return new Promise((resolve, reject) => {
      return this.redisClient.hmset(
        key,
        Object.entries(value).flat(),
        (err, reply) => {
          if (err) {
            reject(err);
          }
          resolve(reply);
        },
      );
    });
  }

  // wrapper methods

  getScopes(userId: string, tokenId: string) {
    return this.hmget(`user:accessToken:${userId}:${tokenId}`, ['scopes']);
  }

  setAccessToken(userId: string, tokenId: string, scopes: string[]) {
    return this.hmset(`user:accessToken:${userId}:${tokenId}`, {
      userId,
      scopes: scopes.join(' '),
    });
  }

  setRefreshToken(userId: string, tokenId: string) {
    return this.hmset(`user:refreshToken:${userId}:${tokenId}`, { userId });
  }

  delAccessToken(userId: string, tokenId: string) {
    return this.del(`user:accessToken:${userId}:${tokenId}`);
  }

  delRefreshToken(userId: string, tokenId: string) {
    return this.del(`user:refreshToken:${userId}:${tokenId}`);
  }
}
