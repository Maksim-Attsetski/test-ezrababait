import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users, UsersSchema } from './users.schema';
import { AuthModule } from '../auth/auth.module';

const userModel = MongooseModule.forFeature([
  { name: Users.name, schema: UsersSchema },
]);

@Module({
  imports: [userModel, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [userModel],
})
export class UsersModule {}
