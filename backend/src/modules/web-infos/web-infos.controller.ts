import { Controller, Get, Body, Post, Param, UseGuards } from '@nestjs/common';
import { WebInfosService } from './web-infos.service';
import { UpdateWebInfoDto } from './dto/update-web-info.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '../auth/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('web-infos')
@ApiTags('webInfos')
export class WebInfosController {
  constructor(private readonly webInfosService: WebInfosService) {}

  @Get()
  find() {
    return this.webInfosService.find();
  }

  @Post(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateWebInfoDto: UpdateWebInfoDto) {
    return this.webInfosService.update(+id, updateWebInfoDto);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  create(@Body() updateWebInfoDto: UpdateWebInfoDto) {
    return this.webInfosService.create(updateWebInfoDto);
  }
}
