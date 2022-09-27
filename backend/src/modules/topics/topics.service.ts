import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiError } from 'src/common/api';
import { DataSource, Repository } from 'typeorm';
import { FlowerTopicService } from '../flower-topic/flower-topic.service';
import { FlowersService } from '../flowers/flowers.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic) private topicsRepository: Repository<Topic>,
    private flowersService: FlowersService,
    private flowerTopicService: FlowerTopicService,
    private dataSource: DataSource
  ) {}
  async create(createTopicDto: CreateTopicDto) {
    const { flowerIds, description, name } = createTopicDto;
    await this.dataSource.transaction(async (manager) => {
      const newTopic = this.topicsRepository.create({ description, name });
      await manager.save(newTopic);
      const listPromise = [];
      flowerIds.map(async (flowerId: number) => {
        const flower = await this.flowersService.findById(flowerId);
        if (!flower.data) {
          throw Error('Flower not existed');
        }
        const flowerTopic = this.flowerTopicService.create({
          flower: flower.data,
          topic: newTopic,
        });
      });
      const s = Promise.all(listPromise);
    });
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
