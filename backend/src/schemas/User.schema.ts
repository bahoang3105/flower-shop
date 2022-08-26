import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { Role } from 'src/modules/auth/role.enum';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type UserDocument = User & Document;

export enum UserSex {
  Female = 'FEMALE',
  Male = ' MALE',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ default: Role.User })
  role: Role;

  @Prop({ type: String, isRequired: true })
  password: string;

  @Prop({ type: String, isRequired: true })
  username: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: Date })
  dateOfBirth: Date;

  @Prop({ enum: UserSex, default: UserSex.Male })
  sex: UserSex;

  @Prop({ type: Number, isRequired: false })
  mobilePhone: Number;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(paginate);
UserSchema.plugin(aggregatePaginate);
