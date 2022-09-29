import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiError, ApiOk } from 'src/common/api';
import { DataSource, Repository } from 'typeorm';
import { FlowerTopicService } from '../flower-topic/flower-topic.service';
import { FlowersService } from '../flowers/flowers.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicsService {
  private logger: Logger = new Logger(TopicsService.name);
  constructor(
    @InjectRepository(Topic) private topicsRepository: Repository<Topic>,
    private flowersService: FlowersService,
    private flowerTopicService: FlowerTopicService,
    private dataSource: DataSource
  ) {}

  async create(createTopicDto: CreateTopicDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    const { flowerIds, ...topicInfo } = createTopicDto;
    try {
      queryRunner.startTransaction();
      // create new topic
      const newTopic = this.topicsRepository.create(topicInfo);
      const savedTopic = await this.topicsRepository.save(newTopic);
      // map flower and create flowerTopic instances
      flowerIds &&
        (await Promise.all(
          flowerIds.map(async (id: number) => {
            const flower = await this.flowersService.findById(id);
            await this.flowerTopicService.createByFlowerAndTopic(
              flower,
              savedTopic
            );
          })
        ));
      return ApiOk(savedTopic);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return ApiError('Topic', e);
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(id: number) {
    try {
      const topic = await this.findById(id);
      return ApiOk(topic);
    } catch (e) {
      return ApiError('Topic', e);
    }
  }

  findById(id: number) {
    return this.topicsRepository.findOne({
      where: { id, isDeleted: false },
    });
  }

  async update(id: number, updateTopicDto: UpdateTopicDto) {
    try {
      const topic = await this.findById(id);
      const updatedTopic = await this.topicsRepository.save({
        ...topic,
        ...updateTopicDto,
      });
      return ApiOk(updatedTopic);
    } catch (e) {
      this.logger.log('=== Update Topic failed ===', e);
      return ApiError('Topic', e);
    }
  }

  async remove(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.startTransaction();
      await this.topicsRepository.update({ id }, { isDeleted: true });
      this.flowerTopicService.removeByTopicId(id);
      return ApiOk({ success: true });
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return ApiError('Topic', e);
    } finally {
      await queryRunner.release();
    }
  }
}
