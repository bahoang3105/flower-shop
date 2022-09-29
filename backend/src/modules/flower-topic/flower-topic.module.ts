import { forwardRef, Module } from '@nestjs/common';
import { FlowerTopicService } from './flower-topic.service';
import { FlowerTopicController } from './flower-topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowerTopic } from './entities/flower-topic.entity';
import { FlowersModule } from '../flowers/flowers.module';
import { TopicsModule } from '../topics/topics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FlowerTopic]),
    forwardRef(() => FlowersModule),
    forwardRef(() => TopicsModule),
  ],
  controllers: [FlowerTopicController],
  providers: [FlowerTopicService],
  exports: [FlowerTopicService],
})
export class FlowerTopicModule {}
