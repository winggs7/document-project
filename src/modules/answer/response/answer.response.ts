import { Exclude, Expose } from 'class-transformer';
import { BaseResponse } from 'src/common/types/base.response';
import { EStatus } from 'src/constant/enum';

@Exclude()
export class AnswerResponse extends BaseResponse {
  @Expose()
  name: string;

  @Expose()
  is_correct?: EStatus;

  @Expose()
  order_index?: number;

  @Expose()
  match?: string | number;
}
