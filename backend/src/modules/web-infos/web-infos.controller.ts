import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebInfosService } from './web-infos.service';
import { CreateWebInfoDto } from './dto/create-web-info.dto';
import { UpdateWebInfoDto } from './dto/update-web-info.dto';

@Controller('web-infos')
export class WebInfosController {
  constructor(private readonly webInfosService: WebInfosService) {}

  @Post()
  create(@Body() createWebInfoDto: CreateWebInfoDto) {
    return this.webInfosService.create(createWebInfoDto);
  }

  @Get()
  findAll() {
    return this.webInfosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webInfosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebInfoDto: UpdateWebInfoDto) {
    return this.webInfosService.update(+id, updateWebInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webInfosService.remove(+id);
  }
}
