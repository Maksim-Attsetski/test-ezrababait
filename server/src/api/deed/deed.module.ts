import { Module } from '@nestjs/common';
import { DeedService } from './deed.service';
import { DeedController } from './deed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Deed, DeedSchema } from './deed.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deed.name, schema: DeedSchema }]),
  ],
  controllers: [DeedController],
  providers: [DeedService],
  exports: [DeedService],
})
export class DeedModule {}
