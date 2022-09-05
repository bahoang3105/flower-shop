import { PartialType } from '@nestjs/swagger';
import { CreateFlowerTopicDto } from './create-flower-topic.dto';

export class UpdateFlowerTopicDto extends PartialType(CreateFlowerTopicDto) {}
