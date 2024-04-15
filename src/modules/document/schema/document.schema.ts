import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Base } from 'src/common/database/schema/base.schema';
import { defaultSchemaOptions } from 'src/common/utils/object.util';
import { EDocumentType, EFileType, EStatus } from 'src/constant/enum';
import { Question } from 'src/modules/question/schemas/question.schema';

export type DocumentDocument = HydratedDocument<Document>;

@Schema(defaultSchemaOptions)
export class Document extends Base {
  @Prop()
  name: string;

  @Prop()
  desc: string;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Question' })
  questions?: Question[];

  @Prop()
  texts?: string[];

  @Prop()
  urls?: string[];

  @Prop()
  file_type?: EFileType;

  @Prop()
  document_type: EDocumentType;

  @Prop()
  usage_count: number;

  @Prop()
  status: EStatus;
}

const DocumentSchema = SchemaFactory.createForClass(Document);

export { DocumentSchema };
