import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flower } from '../flowers/entities/flower.entity';
import { Topic } from '../topics/entities/topic.entity';
import { CreateFlowerTopicDto } from './dto/create-flower-topic.dto';
import { UpdateFlowerTopicDto } from './dto/update-flower-topic.dto';
import { FlowerTopic } from './entities/flower-topic.entity';

@Injectable()
export class FlowerTopicService {
  constructor(
    @InjectRepository(FlowerTopic)
    private flowerTopicsRepository: Repository<FlowerTopic>
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

  remove(id: number) {
    return `This action removes a #${id} flowerTopic`;
  }
}
