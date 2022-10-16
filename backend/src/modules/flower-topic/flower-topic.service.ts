import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { ApiError, ApiOk } from 'src/common/api';
import { Repository } from 'typeorm';
import { Flower } from '../flowers/entities/flower.entity';
import { FlowersService } from '../flowers/flowers.service';
import { Topic } from '../topics/entities/topic.entity';
import { TopicsService } from '../topics/topics.service';
import { FlowerTopic } from './entities/flower-topic.entity';

@Injectable()
export class FlowerTopicService {
  private logger: Logger = new Logger(FlowerTopicService.name);
  constructor(
    @InjectRepository(FlowerTopic)
    private flowerTopicsRepository: Repository<FlowerTopic>,
    @Inject(forwardRef(() => FlowersService))
    private flowersService: FlowersService,
    @Inject(forwardRef(() => TopicsService))
    private topicsService: TopicsService
  ) {}

  async createByFlowerAndTopic(flower: Flower, topic: Topic) {
    const newFlowerTopic = this.flowerTopicsRepository.create({
      flower,
      topic,
    });
    return await this.flowerTopicsRepository.save(newFlowerTopic);
  }

  async create(flowerId: number, topicId: number) {
    const flowerTopic = await this.flowerTopicsRepository
      .createQueryBuilder('flowerTopic')
      .where('flowerTopic.flowerId = :flowerId', { flowerId })
      .andWhere('flowerTopic.topicId = :topicId', { topicId })
      .getOne();
    const flower = await this.flowersService.findById(flowerId);
    const topic = await this.topicsService.findById(topicId);
    if (flower && topic) {
      if (!flowerTopic) {
        await this.createByFlowerAndTopic(flower, topic);
      } else if (flowerTopic.isDeleted) {
        await this.flowerTopicsRepository.save({
          ...flowerTopic,
          isDeleted: false,
        });
      } else {
        return ApiError('E1', 'FlowerTopic existed');
      }
    } else {
      return ApiError('E2', 'Flower or Topic does not exist');
    }
  }

  async remove(id: number) {
    try {
      await this.flowerTopicsRepository.update({ id }, { isDeleted: true });
      return ApiOk({ success: true });
    } catch (e) {
      this.logger.log('=== Remove FlowerTopic failed ===', e);
      return ApiError('FlowerTopic', e);
    }
  }

  removeByFlowerId(id: number) {
    this.flowerTopicsRepository
      .createQueryBuilder()
      .update()
      .set({ isDeleted: true })
      .where('flowerId = :id ', { id })
      .execute();
  }

  removeByTopicId(id: number) {
    this.flowerTopicsRepository
      .createQueryBuilder()
      .update()
      .set({ isDeleted: true })
      .where('topicId = :id ', { id })
      .execute();
  }

  async removeByFlowerIdAndTopicId(flowerId: number, topicId: number) {
    await this.flowerTopicsRepository
      .createQueryBuilder()
      .update(FlowerTopic)
      .set({ isDeleted: true })
      .where('flowerId = :flowerId', { flowerId })
      .andWhere('topicId = :topicId', { topicId })
      .execute();
  }

  async getTopicsByFlowerId(flowerId: number) {
    const listFlowerTopic = await this.flowerTopicsRepository
      .createQueryBuilder('flowerTopic')
      .where('flowerTopic.flowerId = (:flowerId)', { flowerId })
      .andWhere('flowerTopic.isDeleted = false')
      .leftJoinAndSelect(
        'flowerTopic.topic',
        'topic',
        'topic.isDeleted = false'
      )
      .getMany();
    return listFlowerTopic.map((flowerTopic: FlowerTopic) => flowerTopic.topic);
  }
}
