import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from 'src/common/database/schema/base.schema';
import { defaultSchemaOptions } from 'src/common/utils/object.util';
import { EStatus } from 'src/constant/enum';

export type AnswerDocument = HydratedDocument<Answer>;

@Schema(defaultSchemaOptions)
export class Answer extends Base {
  @Prop()
  name: string;

  @Prop()
  is_correct: EStatus;

  @Prop()
  order_index: number;

  @Prop()
  match: number;
}

const AnswerSchema = SchemaFactory.createForClass(Answer);

export { AnswerSchema };
