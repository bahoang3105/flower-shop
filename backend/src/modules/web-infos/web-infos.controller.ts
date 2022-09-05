import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { WebInfosService } from './web-infos.service';
import { UpdateWebInfoDto } from './dto/update-web-info.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('web-infos')
@ApiTags('webInfos')
export class WebInfosController {
  constructor(private readonly webInfosService: WebInfosService) {}

  @Get()
  find() {
    return this.webInfosService.find();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebInfoDto: UpdateWebInfoDto) {
    return this.webInfosService.update(+id, updateWebInfoDto);
  }
}
