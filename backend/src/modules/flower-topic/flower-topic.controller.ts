import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FlowerTopicService } from './flower-topic.service';
import { CreateFlowerTopicDto } from './dto/create-flower-topic.dto';
import { UpdateFlowerTopicDto } from './dto/update-flower-topic.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('flower-topic')
@ApiTags('flowerTopics (Todo)')
export class FlowerTopicController {
  constructor(private readonly flowerTopicService: FlowerTopicService) {}

  @Post()
  create(@Body() createFlowerTopicDto: CreateFlowerTopicDto) {
    return this.flowerTopicService.create(createFlowerTopicDto);
  }

  @Get()
  findAll() {
    return this.flowerTopicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flowerTopicService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFlowerTopicDto: UpdateFlowerTopicDto
  ) {
    return this.flowerTopicService.update(+id, updateFlowerTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flowerTopicService.remove(+id);
  }
}