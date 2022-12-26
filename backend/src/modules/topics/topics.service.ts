import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiError, ApiOk } from 'src/common/api';
import { Utils } from 'src/common/utils';
import { DataSource, Repository } from 'typeorm';
import { FlowerTopic } from '../flower-topic/entities/flower-topic.entity';
import { FlowerTopicService } from '../flower-topic/flower-topic.service';
import { FlowersService } from '../flowers/flowers.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { SearchTopicDto } from './dto/search-topic.dto';
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
      const newTopic = this.topicsRepository.create({
        ...topicInfo,
        createdAt: Utils.getCurrentDate(),
      });
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
      this.logger.log('=== Create Topic failed ===', e);
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
      this.logger.log('=== Find Topic failed ===', e);
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
      await this.flowerTopicService.removeByTopicId(id);
      return ApiOk({ success: true });
    } catch (e) {
      this.logger.log('=== Remove Topic failed ===', e);
      await queryRunner.rollbackTransaction();
      return ApiError('Topic', e);
    } finally {
      await queryRunner.release();
    }
  }

  async search(searchTopicDto: SearchTopicDto) {
    const { keyword, limit, page, sortField, sortValue, getEmptyTopic } =
      searchTopicDto;
    try {
      const queryBuilder = this.topicsRepository
        .createQueryBuilder('topic')
        .where((qb) => {
            qb.where('topic.name like :keyword', {
              keyword: `%${keyword}%`,
            }).orWhere('topic.id like :keyword', { keyword: `%${keyword}%` });
          }
        )
        .andWhere('topic.isDeleted = false');

        if (getEmptyTopic === false) {
          queryBuilder.innerJoinAndMapMany(
            'topic.listFlower',
            FlowerTopic,
            'flowerTopic',
            'topic.id = flowerTopic.topicId AND flowerTopic.isDeleted = false'
          );
        }

        queryBuilder
        .orderBy(sortField, sortValue)
        .skip(limit * (page - 1))
        .take(limit);
      
      const [items, totalItems] = await queryBuilder.getManyAndCount();
      return ApiOk({
        items,
        meta: {
          totalItems,
          itemCount: items.length,
        }
      });
    } catch (e) {
      this.logger.log('=== Search Topic failed ===', e);
      return ApiError('Topic', e);
    }
  }
}
