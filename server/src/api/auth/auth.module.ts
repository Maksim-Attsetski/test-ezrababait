import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { Token, TokenSchema } from './token.schema';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    forwardRef(() => UsersModule),
    JwtModule.register({
      privateKey: process.env.PRIVATE_JWT_KEY || 'PRIVATE_JWT_KEY',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
