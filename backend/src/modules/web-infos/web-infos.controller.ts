import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { WebInfosService } from './web-infos.service';
import { UpdateWebInfoDto } from './dto/update-web-info.dto';
import { ObjectId } from 'mongoose';

@Controller('web-infos')
export class WebInfosController {
  constructor(private readonly webInfosService: WebInfosService) {}

  @Get()
  findAll() {
    return this.webInfosService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateWebInfoDto: UpdateWebInfoDto
  ) {
    return this.webInfosService.update(id, updateWebInfoDto);
  }
}
