import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type FlowerTypeDocument = FlowerType & Document;

@Schema({
  timestamps: true,
})
export class FlowerType {
  @Prop({ type: String, isRequired: true })
  name: string;

  @Prop({ type: String, isRequired: false })
  description: string;
}

export const FlowerTypeSchema = SchemaFactory.createForClass(FlowerType);
FlowerTypeSchema.plugin(paginate);
FlowerTypeSchema.plugin(aggregatePaginate);
