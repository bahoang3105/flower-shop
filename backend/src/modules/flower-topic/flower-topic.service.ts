import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiError, ApiOk } from 'src/common/api';
import { Repository } from 'typeorm';
import { Flower } from '../flowers/entities/flower.entity';
import { Topic } from '../topics/entities/topic.entity';
import { FlowerTopic } from './entities/flower-topic.entity';

@Injectable()
export class FlowerTopicService {
  private logger: Logger = new Logger(FlowerTopicService.name);
  constructor(
    @InjectRepository(FlowerTopic)
    private flowerTopicsRepository: Repository<FlowerTopic>
  ) {}

  async createByFlowerAndTopic(flower: Flower, topic: Topic) {
    const newFlowerTopic = this.flowerTopicsRepository.create({
      flower,
      topic,
    });
    return await this.flowerTopicsRepository.save(newFlowerTopic);
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

  async getTopicsByFlowerId(flowerId: number) {
    const listFlowerTopic = await this.flowerTopicsRepository
      .createQueryBuilder('flowerTopic')
      .where('flowerId = :flowerId', { flowerId })
      .leftJoinAndSelect(
        'flowerTopic.topic',
        'topic',
        'topic.isDeleted = false'
      )
      .getMany();
    return listFlowerTopic.map((flowerTopic: FlowerTopic) => flowerTopic.topic);
  }
}
