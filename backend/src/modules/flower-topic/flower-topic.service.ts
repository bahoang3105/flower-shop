import { Injectable } from '@nestjs/common';
import { CreateFlowerTopicDto } from './dto/create-flower-topic.dto';
import { UpdateFlowerTopicDto } from './dto/update-flower-topic.dto';

@Injectable()
export class FlowerTopicService {
  create(createFlowerTopicDto: CreateFlowerTopicDto) {
    return 'This action adds a new flowerTopic';
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
