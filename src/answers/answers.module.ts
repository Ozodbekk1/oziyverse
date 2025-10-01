import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from './schemas/answer.schema';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { QuestionsModule } from '../questions/questions.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]), QuestionsModule],
  controllers: [AnswersController],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
