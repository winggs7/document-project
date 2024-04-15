import { Exclude, Expose, Type } from 'class-transformer';
import { BaseResponse } from 'src/common/types/base.response';
import { EDocumentType, EFileType, EStatus } from 'src/constant/enum';
import { QuestionResponse } from 'src/modules/question/response/question.response';

@Exclude()
export class DocumentResponse extends BaseResponse {
  @Expose()
  name: string;

  @Expose()
  desc: string;

  @Expose()
  score: number;

  @Expose()
  status: EStatus;

  @Expose()
  @Type(() => QuestionResponse)
  questions: QuestionResponse[];

  @Expose()
  texts: string[];

  @Expose()
  urls: string[];

  @Expose()
  file_type: EFileType;

  @Expose()
  document_type: EDocumentType;

  @Expose()
  usage_count: number;
}
