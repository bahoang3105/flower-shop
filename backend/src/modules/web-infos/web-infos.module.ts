import { Module } from '@nestjs/common';
import { WebInfosService } from './web-infos.service';
import { WebInfosController } from './web-infos.controller';

@Module({
  controllers: [WebInfosController],
  providers: [WebInfosService]
})
export class WebInfosModule {}
