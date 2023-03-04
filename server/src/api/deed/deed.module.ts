import { Module } from '@nestjs/common';
import { DeedService } from './deed.service';
import { DeedController } from './deed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Deed, DeedSchema } from './deed.schema';
import { AuthModule } from '../auth/auth.module';

const deedsModel = MongooseModule.forFeature([
  { name: Deed.name, schema: DeedSchema },
]);

@Module({
  imports: [deedsModel, AuthModule],
  controllers: [DeedController],
  providers: [DeedService],
  exports: [DeedService, deedsModel],
})
export class DeedModule {}
