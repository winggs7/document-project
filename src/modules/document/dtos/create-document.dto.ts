import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { IsEnumValue } from 'src/common/decorators/enum-value.decorator';
import { EDocumentType, EFileType, EStatus } from 'src/constant/enum';

export class CreateDocumentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  desc: string;

  @IsOptional()
  @IsArray()
  questions: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  texts: string[];

  @IsOptional()
  @IsArray()
  urls: string[];

  @IsOptional()
  @IsEnumValue(EFileType)
  file_type: EFileType;

  @IsNotEmpty()
  @IsEnumValue(EDocumentType)
  document_type = EDocumentType.file;

  @IsOptional()
  @IsInt()
  usage_count = 0;

  @IsNotEmpty()
  @IsEnumValue(EStatus)
  status = EStatus.active;
}
