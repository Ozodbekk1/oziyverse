import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop({ type: Types.ObjectId, refPath: 'entityType' })
  entityId: Types.ObjectId;

  @Prop({ enum: ['Question', 'Answer'], required: true })
  entityType: string;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ required: true, unique: true })
  slug: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
