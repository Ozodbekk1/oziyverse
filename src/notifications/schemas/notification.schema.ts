/** @format */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ required: true })
  userId: string; // Who receives this notification

  @Prop({ required: true })
  type: string; // 'answer', 'comment', 'accept', 'vote', etc.

  @Prop({ required: true })
  message: string;

  @Prop({ default: false })
  read: boolean;

  @Prop()
  refId: string; // Slug or ID of the related question/answer/etc.
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
