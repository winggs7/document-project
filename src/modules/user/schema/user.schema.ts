import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from 'src/common/database/schema/base.schema';
import { defaultSchemaOptions } from 'src/common/utils/object.util';
import { ERole, EStatus } from 'src/constant/enum';

export type UserDocument = HydratedDocument<User>;

@Schema(defaultSchemaOptions)
export class User extends Base {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  status: EStatus;

  @Prop()
  role: ERole;

  @Prop()
  full_name: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
