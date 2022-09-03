import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { Topic } from './Topic.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type FlowerDocument = Flower & Document;

@Schema({
  timestamps: true,
})
export class Flower {
  @Prop({ type: Topic })
  topic: Topic;

  @Prop({ type: String, isRequired: true })
  name: String;

  @Prop({ type: String })
  description: String;

  @Prop({ type: String })
  color: String;

  @Prop({ type: String })
  size: String;

  @Prop({ type: [String] })
  listImage: String[];

  @Prop({ type: Number })
  quantity: Number;

  @Prop({ type: Number })
  price: Number;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const FlowerSchema = SchemaFactory.createForClass(Flower);
FlowerSchema.plugin(paginate);
FlowerSchema.plugin(aggregatePaginate);
