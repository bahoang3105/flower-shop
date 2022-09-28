import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiError, ApiOk } from 'src/common/api';
import { DataSource, Repository } from 'typeorm';
import { Flower } from '../flowers/entities/flower.entity';
import { Topic } from '../topics/entities/topic.entity';
import { CreateFlowerTopicDto } from './dto/create-flower-topic.dto';
import { UpdateFlowerTopicDto } from './dto/update-flower-topic.dto';
import { FlowerTopic } from './entities/flower-topic.entity';

@Injectable()
export class FlowerTopicService {
  private logger: Logger = new Logger(FlowerTopicService.name);
  constructor(
    @InjectRepository(FlowerTopic)
    private flowerTopicsRepository: Repository<FlowerTopic>,
    private dataSource: DataSource
  ) {}

  create(createFlowerTopicDto: CreateFlowerTopicDto) {
    return 'This action adds a new flowerTopic';
  }

  async createByFlowerAndTopic(flower: Flower, topic: Topic) {
    const newFlowerTopic = this.flowerTopicsRepository.create({
      flower,
      topic,
    });
    return await this.flowerTopicsRepository.save(newFlowerTopic);
  }

  findAll() {
    return `This action returns all flowerTopic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} flowerTopic`;
  }

  update(id: number, updateFlowerTopicDto: UpdateFlowerTopicDto) {
    return `This action updates a #${id} flowerTopic`;
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
}
