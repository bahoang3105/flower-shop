import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { Flower } from './Flower.schema';
import { Topic } from './Topic.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type FlowerTopicDocument = FlowerTopic & Document;

@Schema({
  timestamps: true,
})
export class FlowerTopic {
  @Prop({ type: Topic, isRequired: true })
  topic: Topic;

  @Prop({ type: Flower, isRequired: true })
  flower: Flower;
}

export const FlowerTopicSchema = SchemaFactory.createForClass(FlowerTopic);
FlowerTopicSchema.plugin(paginate);
FlowerTopicSchema.plugin(aggregatePaginate);
