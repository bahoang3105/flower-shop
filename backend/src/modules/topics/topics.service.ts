import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ApiError, ApiOk } from 'src/common/api';
import { SearchDto } from 'src/common/search.dto';
import { Utils } from 'src/common/utils';
import { Topic, TopicDocument } from 'src/schemas/Topic.schema';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicsUtils } from './topics.utils';

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

  async search(searchDto: SearchDto) {
    try {
      const { keyword } = searchDto;
      const $match = TopicsUtils.matchSearchTopics(searchDto);
      const searchTopicPipeline = !!keyword ? [{ $match }] : [];
      const result = await Utils.aggregatePaginate(
        this.topicModel,
        searchTopicPipeline,
        searchDto
      );
      return ApiOk(result);
    } catch (e) {
      return ApiError('E1', e);
    }
  }

  async findOne(id: ObjectId) {
    try {
      const topic = await this.topicModel.findById(id);
      return ApiOk(topic);
    } catch (e) {
      return ApiError('E2', e);
    }
  }

  async update(id: ObjectId, updateTopicDto: UpdateTopicDto) {
    try {
      const topic = await this.topicModel.findByIdAndUpdate(id, updateTopicDto);
      return ApiOk(topic);
    } catch (e) {
      return ApiError('E4', e);
    }
  }

  async remove(id: ObjectId) {
    try {
      const topic = await this.topicModel.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      return ApiOk(topic);
    } catch (e) {
      return ApiError('E4', e);
    }
  }
}
