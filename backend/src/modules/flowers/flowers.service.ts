import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { ApiError, ApiOk } from 'src/common/api';
import { VALUE } from 'src/common/constants';
import { Utils } from 'src/common/utils';
import { Brackets, DataSource, Repository } from 'typeorm';
import { FlowerTopic } from '../flower-topic/entities/flower-topic.entity';
import { FlowerTopicService } from '../flower-topic/flower-topic.service';
import { Image } from '../images/entities/image.entity';
import { TopicsService } from '../topics/topics.service';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { SearchFlowerDto } from './dto/search-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { Flower } from './entities/flower.entity';

@Injectable()
export class FlowersService {
  private logger: Logger = new Logger(FlowersService.name);
  constructor(
    @InjectRepository(Flower) private flowersRepository: Repository<Flower>,
    @InjectRepository(Image) private imagesRepository: Repository<Image>,
    @Inject(forwardRef(() => TopicsService))
    private topicsService: TopicsService,
    @Inject(forwardRef(() => FlowerTopicService))
    private flowerTopicService: FlowerTopicService,
    private dataSource: DataSource
  ) {}

  async create(
    createFlowerDto: CreateFlowerDto,
    files: Array<Express.Multer.File>
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    const { topicIds, ...flowerInfo } = createFlowerDto;
    try {
      queryRunner.startTransaction();

      // check files length and file size
      if (files.length > VALUE.MAX_FILES_LENGTH) {
        throw new HttpException('E3', HttpStatus.BAD_REQUEST);
      }
      files.forEach((file) => {
        if (file.size > VALUE.MAX_FILE_SIZE) {
          throw new HttpException('E4', HttpStatus.BAD_REQUEST);
        }
      });

      // save images
      const listPromise: Promise<Image>[] = [];
      files.forEach((file) => {
        const image = this.imagesRepository.create({
          createdAt: Utils.getCurrentDate(),
          fileName: file.originalname,
          filePath: process.env.IMAGE_URL + '/' + file.path,
        });
        const imagePromise = this.imagesRepository.save(image);
        listPromise.push(imagePromise);
      });
      const listImage = await Promise.all(listPromise);

      // create flower instance
      const newFlower = this.flowersRepository.create({
        ...flowerInfo,
        createdAt: Utils.getCurrentDate(),
        listImage: listImage,
      });
      const savedFlower = await this.flowersRepository.save(newFlower);

      // map topic and create flowersTopic instances
      topicIds?.length > 0 &&
        (await Promise.all(
          topicIds.map(async (id: number) => {
            const topic = await this.topicsService.findById(id);
            if (!topic) {
              throw NotFoundException;
            }
            await this.flowerTopicService.createByFlowerAndTopic(
              savedFlower,
              topic
            );
          })
        ));
      await queryRunner.commitTransaction();
      return ApiOk(savedFlower);
    } catch (e) {
      this.logger.log('=== Create Flower failed ===', e);
      await queryRunner.rollbackTransaction();
      return ApiError('Flower', e);
    } finally {
      await queryRunner.release();
    }
  }

  async search(searchFlowerDto: SearchFlowerDto) {
    const {
      limit,
      page,
      keyword,
      priceFrom,
      priceTo,
      sortField,
      sortValue,
      topicIds,
    } = searchFlowerDto;
    try {
      const queryBuilder = this.flowersRepository
        .createQueryBuilder('flower')
        .where(
          new Brackets((qb) => {
            qb.where('flower.name like :keyword', {
              keyword: `%${keyword}%`,
            }).orWhere('flower.id like :keyword', { keyword: `%${keyword}%` });
          })
        )
        .andWhere('flower.isDeleted = false');
      if (priceFrom) {
        queryBuilder.andWhere('flower.price >= :priceFrom', { priceFrom });
      }
      if (priceTo) {
        queryBuilder.andWhere('flower.price <= : priceTo', { priceTo });
      }
      if (topicIds?.length > 0) {
        queryBuilder.innerJoinAndMapMany(
          'flower.listTopic',
          FlowerTopic,
          'flowerTopic',
          'flowerTopic.flowerId = flower.id AND flowerTopic.isDeleted = false AND flowerTopic.topicId IN (:...topicIds)',
          { topicIds }
        );
      }
      queryBuilder.leftJoinAndSelect('flower.listImage', 'image');
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
    return this.flowersRepository.findOne({
      where: { id, isDeleted: false },
      relations: { listImage: true },
    });
  }

  async update(
    id: number,
    updateFlowerDto: UpdateFlowerDto,
    additionImages: Express.Multer.File[],
  ) {
    console.log(additionImages)
    const { topicsAdd, topicsDel, listImage, ...flowerInfo } = updateFlowerDto;
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.startTransaction();

      const flower = await this.findById(id);

      if (!flower) {
        throw Error(`Flower doesn't exist`);
      }

      if (!!topicsDel) {
        topicsDel?.forEach(
          async (topicId: number) =>
            await this.flowerTopicService.removeByFlowerIdAndTopicId(
              id,
              topicId
            )
        );
      }

      if (!!topicsAdd) {
        topicsAdd?.forEach(
          async (topicId: number) =>
            await this.flowerTopicService.create(id, topicId)
        );
      }

      // check files length and file size
      if (additionImages?.length > VALUE.MAX_FILES_LENGTH) {
        throw new HttpException('E3', HttpStatus.BAD_REQUEST);
      }
      additionImages?.forEach((file) => {
        if (file.size > VALUE.MAX_FILE_SIZE) {
          throw new HttpException('E4', HttpStatus.BAD_REQUEST);
        }
      });

      // save images
      const listPromise: Promise<Image>[] = [];
      listImage?.forEach((imageId) => {
        const imagePromise = this.imagesRepository.findOne({ where: { id: imageId }});
        listPromise.push(imagePromise);
      });
      additionImages?.forEach((file) => {
        const image = this.imagesRepository.create({
          createdAt: Utils.getCurrentDate(),
          fileName: file.originalname,
          filePath: process.env.IMAGE_URL + '/' + file.path,
          flower: flower,
        });
        const imagePromise = this.imagesRepository.save(image);
        listPromise.push(imagePromise);
      });
      const newListImage = await Promise.all(listPromise);
      

      const { flowerTopics, ...currentInfo } = flower;
      return ApiOk(
        flower &&
          (await this.flowersRepository.save({
            ...currentInfo,
            ...flowerInfo,
            listImage: !!newListImage ? newListImage : [],
          }))
      );
    } catch (e) {
      await queryRunner.rollbackTransaction();
      this.logger.log('=== Update Flower failed ===', e);
      return ApiError('Flower', e);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.startTransaction();
      await this.flowersRepository.update({ id }, { isDeleted: true });
      this.flowerTopicService.removeByFlowerId(id);
      await queryRunner.commitTransaction();
      return ApiOk({ success: true });
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return ApiError('Flower', e);
    } finally {
      await queryRunner.release();
    }
  }
}
