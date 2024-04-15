import { PartialType } from '@nestjs/swagger';
import { CreateAnswerDto } from './create-answer.dto';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {
  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  id: string;
}
