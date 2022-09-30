import {
  Controller,
  Param,
  Delete,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { FlowerTopicService } from './flower-topic.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateFlowerTopicDto } from './dto/create-flower-topic.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '../auth/role.enum';

@Controller('flower-topic')
@ApiTags('flowerTopics')
export class FlowerTopicController {
  constructor(private readonly flowerTopicService: FlowerTopicService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  create(@Body() createFlowerTopicDto: CreateFlowerTopicDto) {
    return this.flowerTopicService.create(createFlowerTopicDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.flowerTopicService.remove(+id);
  }
}
