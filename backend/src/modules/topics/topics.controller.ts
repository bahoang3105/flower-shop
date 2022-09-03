import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '../auth/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchDto } from 'src/common/search.dto';
import { ObjectId } from 'mongoose';

@Controller('topics')
@ApiTags('topic')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  search(@Query() searchDto: SearchDto) {
    return this.topicsService.search(searchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.topicsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: ObjectId, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicsService.update(id, updateTopicDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: ObjectId) {
    return this.topicsService.remove(id);
  }
}
