import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !process.env.NODE_ENV
        ? '.env.dev'
        : `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
