/** @format */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Answer extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: "Question", required: true })
  questionId: Types.ObjectId;

  @Prop({ required: true })
  authorId: string; // changed to string

  @Prop({ default: 0 })
  votes: number;

  @Prop({ default: false })
  isAccepted: boolean;

  @Prop({ required: true, unique: true })
  slug: string;

  // ✅ Add these so TS recognizes them
  createdAt: Date;
  updatedAt: Date;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);

// /** @format */

// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { Document, Types } from "mongoose";

// @Schema({ timestamps: true })
// export class Answer extends Document {
//   @Prop({ required: true })
//   content: string;

//   @Prop({ type: Types.ObjectId, ref: "Question", required: true })
//   questionId: Types.ObjectId;

//   @Prop({ required: true })
//   authorId: string; // ✅ changed to string

//   @Prop({ default: 0 })
//   votes: number;

//   @Prop({ default: false })
//   isAccepted: boolean;

//   @Prop({ required: true, unique: true })
//   slug: string;
// }

// export const AnswerSchema = SchemaFactory.createForClass(Answer);

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';

// @Schema({ timestamps: true })
// export class Answer extends Document {
//   @Prop({ required: true })
//   content: string;

//   @Prop({ type: Types.ObjectId, ref: 'Question', required: true })
//   questionId: Types.ObjectId;

//   @Prop({ type: Types.ObjectId, ref: 'User', required: true })
//   authorId: Types.ObjectId;

//   @Prop({ default: 0 })
//   votes: number;

//   @Prop({ default: false })
//   isAccepted: boolean;

//   @Prop({ required: true, unique: true })
//   slug: string;
// }

// export const AnswerSchema = SchemaFactory.createForClass(Answer);
