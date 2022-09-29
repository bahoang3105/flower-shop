import { Controller, Param, Delete, Post, Body } from '@nestjs/common';
import { FlowerTopicService } from './flower-topic.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateFlowerTopicDto } from './dto/create-flower-topic.dto';

@Controller('flower-topic')
@ApiTags('flowerTopics')
export class FlowerTopicController {
  constructor(private readonly flowerTopicService: FlowerTopicService) {}

  @Post()
  create(@Body() createFlowerTopicDto: CreateFlowerTopicDto) {
    return this.flowerTopicService.create(createFlowerTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flowerTopicService.remove(+id);
  }
}
