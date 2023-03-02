import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { UsersDocument } from '../users/users.schema';

export type DeedDocument = HydratedDocument<Deed>;

@Schema()
export class Deed {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  goal: string;

  @Prop({ type: MSchema.Types.ObjectId, ref: 'Users' })
  authorID: [UsersDocument];

  @Prop()
  createdAt: number;
}

export const DeedSchema = SchemaFactory.createForClass(Deed);
