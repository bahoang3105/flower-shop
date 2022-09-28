import { Controller, Param, Delete } from '@nestjs/common';
import { FlowerTopicService } from './flower-topic.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('flower-topic')
@ApiTags('flowerTopics (Todo)')
export class FlowerTopicController {
  constructor(private readonly flowerTopicService: FlowerTopicService) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flowerTopicService.remove(+id);
  }
}
