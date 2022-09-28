import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { ApiError, ApiOk } from 'src/common/api';
import { DataSource, Repository } from 'typeorm';
import { FlowerTopicService } from '../flower-topic/flower-topic.service';
import { TopicsService } from '../topics/topics.service';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { SearchFlowerDto } from './dto/search-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { Flower } from './entities/flower.entity';

const testLink =
  'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80';
@Injectable()
export class FlowersService {
  private logger: Logger = new Logger(FlowersService.name);
  constructor(
    @InjectRepository(Flower) private flowersRepository: Repository<Flower>,
    @Inject(forwardRef(() => TopicsService))
    private topicsService: TopicsService,
    private flowerTopicService: FlowerTopicService,
    private dataSource: DataSource
  ) {}

  async create(createFlowerDto: CreateFlowerDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    const { topicIds, files, ...flowerInfo } = createFlowerDto;
    try {
      queryRunner.startTransaction();
      // create flower instance
      const newFlower = this.flowersRepository.create({
        ...flowerInfo,
        listImage: [testLink],
      });
      const savedFlower = await this.flowersRepository.save(newFlower);
      console.log(savedFlower);
      // map topic and create flowersTopic instances
      topicIds &&
        (await Promise.all(
          topicIds.map(async (id: number) => {
            const topic = await this.topicsService.findById(id);
            if (!topic) {
              throw NotFoundException;
            }
            console.log(topic);
            await this.flowerTopicService.createByFlowerAndTopic(
              savedFlower,
              topic
            );
          })
        ));
      return ApiOk(savedFlower);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return ApiError('Flower', e);
    } finally {
      await queryRunner.release();
    }
  }

  async search(searchFlowerDto: SearchFlowerDto) {
    const { limit, page, keyword, priceFrom, priceTo, sortField, sortValue } =
      searchFlowerDto;
    try {
      const queryBuilder = this.flowersRepository
        .createQueryBuilder('flower')
        .where('flower.name like :keyword', { keyword: `%${keyword}%` })
        .andWhere('flower.isDeleted = false');
      if (priceFrom) {
        queryBuilder.andWhere('flower.price >= :priceFrom', { priceFrom });
      }
      if (priceTo) {
        queryBuilder.andWhere('flower.price <= : priceTo', { priceTo });
      }
      queryBuilder.orderBy(sortField, sortValue);
      return ApiOk(await paginate(queryBuilder, { limit, page }));
    } catch (e) {
      this.logger.log('=== Search Flower failed ===', e);
      return ApiError('Flower', e);
    }
  }

  async findOne(id: number) {
    try {
      const flower = await this.findById(id);
      const listTopics = await this.flowerTopicService.getTopicsByFlowerId(id);
      return ApiOk({ flower, listTopics });
    } catch (e) {
      this.logger.log('=== Find Flower failed ===', e);
      return ApiError('Flower', e);
    }
  }

  async findById(id: number) {
    return this.flowersRepository.findOne({ where: { id, isDeleted: false } });
  }

  update(id: number, updateFlowerDto: UpdateFlowerDto) {
    return `This action updates a #${id} flower`;
  }

  async remove(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.startTransaction();
      await this.flowersRepository.update({ id }, { isDeleted: true });
      this.flowerTopicService.removeByFlowerId(id);
      return ApiOk({ success: true });
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return ApiError('Flower', e);
    } finally {
      await queryRunner.release();
    }
  }
}
