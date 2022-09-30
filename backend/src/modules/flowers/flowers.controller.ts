import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TimeoutInterceptor } from 'src/common/interceptor/timeout.interceptor';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '../auth/role.enum';
import { SearchFlowerDto } from './dto/search-flower.dto';

@Controller('flowers')
@ApiTags('flowers')
@UseInterceptors(new TimeoutInterceptor(5 * 60 * 60 * 1000)) // 5h = 5*60*60*1000
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createFlowerDto: CreateFlowerDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.flowersService.create(createFlowerDto);
  }

  @Get()
  search(@Query() searchFlowerDto: SearchFlowerDto) {
    return this.flowersService.search(searchFlowerDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.flowersService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateFlowerDto: UpdateFlowerDto) {
    return this.flowersService.update(+id, updateFlowerDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.flowersService.remove(+id);
  }
}
