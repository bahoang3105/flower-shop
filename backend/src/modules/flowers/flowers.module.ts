import { forwardRef, Module } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { FlowersController } from './flowers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flower } from './entities/flower.entity';
import { TopicsModule } from '../topics/topics.module';
import { FlowerTopicModule } from '../flower-topic/flower-topic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flower]),
    forwardRef(() => TopicsModule),
    FlowerTopicModule,
  ],
  controllers: [FlowersController],
  providers: [FlowersService],
  exports: [FlowersService],
})
export class FlowersModule {}
