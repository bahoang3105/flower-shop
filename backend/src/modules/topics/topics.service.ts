import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiError, ApiOk } from 'src/common/api';
import { Topic, TopicDocument } from 'src/schemas/Topic.schema';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicsService {
  constructor(
    @InjectModel(Topic.name) private topicModel: Model<TopicDocument>
  ) {}

  async create(createTopicDto: CreateTopicDto) {
    try {
      const createdTopic = new this.topicModel(createTopicDto);
      return ApiOk(await createdTopic.save());
    } catch (e) {
      return ApiError('E0', e);
    }
  }

  findAll() {
    return `This action returns all topics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topic`;
  }

  update(id: number, updateTopicDto: UpdateTopicDto) {
    return `This action updates a #${id} topic`;
  }

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
