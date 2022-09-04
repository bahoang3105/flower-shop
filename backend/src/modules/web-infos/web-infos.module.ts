import { Module } from '@nestjs/common';
import { WebInfosService } from './web-infos.service';
import { WebInfosController } from './web-infos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WebInfo, WebInfoSchema } from 'src/schemas/WebInfo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WebInfo.name, schema: WebInfoSchema }]),
  ],
  controllers: [WebInfosController],
  providers: [WebInfosService],
})
export class WebInfosModule {}
