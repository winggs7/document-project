import { PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  id: string;
}
