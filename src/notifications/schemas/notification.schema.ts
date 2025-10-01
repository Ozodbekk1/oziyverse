/** @format */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ required: true })
  userId: string; // The recipient

  @Prop({ required: true })
  type: string; // 'answer', 'comment', etc

  @Prop({ required: true })
  message: string;

  @Prop({ default: false })
  read: boolean;

  @Prop()
  refId?: string; // Reference to related object (question/answer)
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
