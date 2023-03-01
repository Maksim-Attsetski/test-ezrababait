import { JwtService } from '@nestjs/jwt/dist';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { Token, TokenSchema } from './token.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    UsersModule,
    JwtModule.register({
      privateKey: process.env.PRIVATE_JWT_KEY || 'PRIVATE_JWT_KEY',
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AuthModule {}
