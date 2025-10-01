import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  username: string;

  @Prop({ default: 0 })
  reputation: number;

  @Prop({ default: 0 })
  questionCount: number;

  @Prop({ default: 0 })
  answerCount: number;

  @Prop({ required: true, unique: true })
  slug: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
