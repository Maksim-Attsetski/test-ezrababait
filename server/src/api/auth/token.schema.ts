import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { UsersDocument } from '../users/users.schema';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  @Prop({ required: true, unique: true })
  refreshToken: string;

  @Prop({ type: MSchema.Types.ObjectId, ref: 'Users' })
  userID: [UsersDocument];
}

export const TokenSchema = SchemaFactory.createForClass(Token);
