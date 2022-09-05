import { Module } from '@nestjs/common';
import { WebInfosService } from './web-infos.service';
import { WebInfosController } from './web-infos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebInfo } from './entities/web-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WebInfo])],
  controllers: [WebInfosController],
  providers: [WebInfosService],
})
export class WebInfosModule {}
