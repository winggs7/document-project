import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Base } from 'src/common/database/schema/base.schema';
import { defaultSchemaOptions } from 'src/common/utils/object.util';
import { EQuestionType } from 'src/constant/enum';
import { Answer } from 'src/modules/answer/schemas/answer.schema';

export type QuestionDocument = HydratedDocument<Question>;

@Schema(defaultSchemaOptions)
export class Question extends Base {
  @Prop()
  name: string;

  @Prop()
  desc: string;

  @Prop()
  score: number;

  @Prop()
  question_type: EQuestionType;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Answer' })
  answers: Answer[];
}

const QuestionSchema = SchemaFactory.createForClass(Question);

export { QuestionSchema };
