import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { FlowersModule } from '../flowers/flowers.module';
import { FlowerTopicModule } from '../flower-topic/flower-topic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic]),
    FlowersModule,
    FlowerTopicModule,
  ],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule {}
