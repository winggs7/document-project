import { PartialType } from '@nestjs/swagger';
import { CreateDocumentDto } from './create-document.dto';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {
  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  id: string;
}
