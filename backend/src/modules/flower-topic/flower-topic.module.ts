import { Module } from '@nestjs/common';
import { FlowerTopicService } from './flower-topic.service';
import { FlowerTopicController } from './flower-topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowerTopic } from './entities/flower-topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FlowerTopic])],
  controllers: [FlowerTopicController],
  providers: [FlowerTopicService],
  exports: [FlowerTopicService],
})
export class FlowerTopicModule {}
