import { Module } from '@nestjs/common';
import { FlowerTopicService } from './flower-topic.service';
import { FlowerTopicController } from './flower-topic.controller';

@Module({
  controllers: [FlowerTopicController],
  providers: [FlowerTopicService]
})
export class FlowerTopicModule {}
