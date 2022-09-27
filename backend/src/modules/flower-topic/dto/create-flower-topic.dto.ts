import { Flower } from 'src/modules/flowers/entities/flower.entity';
import { Topic } from 'src/modules/topics/entities/topic.entity';

export class CreateFlowerTopicDto {
  flower: Flower;
  topic: Topic;
}
