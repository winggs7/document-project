import { Module } from '@nestjs/common';
import { AnswerModule } from 'src/modules/answer/answer.module';
import { DocumentModule } from 'src/modules/document/document.module';
import { QuestionModule } from 'src/modules/question/question.module';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [AnswerModule, QuestionModule, DocumentModule],
})
export class RoutesPublicModule {}
