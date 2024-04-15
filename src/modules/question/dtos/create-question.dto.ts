import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsEnumValue } from 'src/common/decorators/enum-value.decorator';
import { EQuestionType } from 'src/constant/enum';
import { CreateAnswerDto } from 'src/modules/answer/dtos/create-answer.dto';
import { UpdateAnswerDto } from 'src/modules/answer/dtos/update-answer.dto';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  desc: string;

  @IsNotEmpty()
  @IsEnumValue(EQuestionType)
  question_type = EQuestionType.bool;

  @IsOptional()
  @IsInt()
  score: number;

  @IsNotEmpty()
  @IsArray()
  answers: CreateAnswerDto[] | UpdateAnswerDto[];
}
