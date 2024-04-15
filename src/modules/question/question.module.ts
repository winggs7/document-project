import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './schemas/question.schema';
import { Answer, AnswerSchema } from '../answer/schemas/answer.schema';
import { QuestionService } from './question.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
  ],
  exports: [QuestionService],
  providers: [QuestionService],
  controllers: [],
})
export class QuestionModule {}
