import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsEnumValue } from 'src/common/decorators/enum-value.decorator';
import { EStatus } from 'src/constant/enum';

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnumValue(EStatus)
  is_correct = EStatus.active;

  @IsOptional()
  @IsInt()
  order_index: string;

  @IsOptional()
  match: string | number;
}
