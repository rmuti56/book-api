import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserRepository } from './repositories/user.repository';
import { JwtStrategy } from './strategies/jwt.strategry';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [TypeOrmModule],
})
export class AuthModule {}
