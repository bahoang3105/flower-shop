import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { WebInfosService } from './web-infos.service';
import { UpdateWebInfoDto } from './dto/update-web-info.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '../auth/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('web-infos')
@ApiTags('webInfos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
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
