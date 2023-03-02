import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({ default: 'No_Name' })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  tag: string;

  @Prop({ type: [{ type: MSchema.Types.ObjectId, ref: 'Users' }] })
  friends: [UsersDocument];

  @Prop({ type: [{ type: MSchema.Types.ObjectId, ref: 'Users' }] })
  followers: [UsersDocument];

  @Prop({ type: [{ type: MSchema.Types.ObjectId, ref: 'Users' }] })
  friendRequests: [UsersDocument];

  @Prop()
  createdAt: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
