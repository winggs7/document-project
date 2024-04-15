import { Module } from '@nestjs/common';
import { AnswerModule } from 'src/modules/answer/answer.module';
import { DocumentAdminController } from 'src/modules/document/controllers/document.admin.controller';
import { DocumentModule } from 'src/modules/document/document.module';
import { QuestionAdminController } from 'src/modules/question/controllers/question.admin.controller';
import { QuestionModule } from 'src/modules/question/question.module';

@Module({
  controllers: [QuestionAdminController, DocumentAdminController],
  providers: [],
  exports: [],
  imports: [AnswerModule, QuestionModule, DocumentModule],
})
export class RoutesAdminModule {}
