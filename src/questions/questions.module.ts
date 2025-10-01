/** @format */

import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Question, QuestionSchema } from "./schemas/question.schema";
import { QuestionsController } from "./questions.controller";
import { QuestionsService } from "./questions.service";
import { AnswersModule } from "../answers/answers.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
    forwardRef(() => AnswersModule),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
