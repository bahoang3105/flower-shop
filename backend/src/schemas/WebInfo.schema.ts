import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type WebInfoDocument = WebInfo & Document;

@Schema({
  timestamps: true,
})
export class WebInfo {
  @Prop({ type: String, isRequired: true })
  name: string;

  @Prop({ type: String, isRequired: true })
  mobilePhone: string;

  @Prop({ type: String, default: false })
  zaloLink: string;

  @Prop({ type: String, default: false })
  facebookLink: string;

  @Prop({ type: String, default: false })
  email: string;
}

export const WebInfoSchema = SchemaFactory.createForClass(WebInfo);
WebInfoSchema.plugin(paginate);
WebInfoSchema.plugin(aggregatePaginate);
