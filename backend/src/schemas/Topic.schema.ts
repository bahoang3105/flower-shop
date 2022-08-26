import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type TopicDocument = Topic & Document;

@Schema({
  timestamps: true,
})
export class Topic {
  @Prop({ type: String, isRequired: true })
  name: string;

  @Prop({ type: String, isRequired: false })
  description: string;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
TopicSchema.plugin(paginate);
TopicSchema.plugin(aggregatePaginate);
