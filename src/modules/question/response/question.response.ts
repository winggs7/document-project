import { Exclude, Expose, Type } from 'class-transformer';
import { BaseResponse } from 'src/common/types/base.response';
import { EQuestionType } from 'src/constant/enum';
import { AnswerResponse } from 'src/modules/answer/response/answer.response';

@Exclude()
export class QuestionResponse extends BaseResponse {
  @Expose()
  name: string;

  @Expose()
  desc: string;

  @Expose()
  score: number;

  @Expose()
  question_type: EQuestionType;

  @Expose()
  @Type(() => AnswerResponse)
  answers: AnswerResponse[];
}
