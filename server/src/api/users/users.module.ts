import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './users.schema';

const userModel = MongooseModule.forFeature([
  { name: Users.name, schema: UsersSchema },
]);

@Module({
  imports: [userModel],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [userModel],
})
export class UsersModule {}
