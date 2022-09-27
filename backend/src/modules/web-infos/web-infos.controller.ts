import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { WebInfosService } from './web-infos.service';
import { UpdateWebInfoDto } from './dto/update-web-info.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '../auth/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('web-infos')
@ApiTags('webInfos')
@UseGuards(RolesGuard)
export class WebInfosController {
  constructor(private readonly webInfosService: WebInfosService) {}

  @Get()
  find() {
    return this.webInfosService.find();
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateWebInfoDto: UpdateWebInfoDto) {
    return this.webInfosService.update(+id, updateWebInfoDto);
  }
}
