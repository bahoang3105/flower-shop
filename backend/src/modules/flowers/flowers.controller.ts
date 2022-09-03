import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '../auth/role.enum';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

@Controller('flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Body() createFlowerDto: CreateFlowerDto,
    @UploadedFiles() listImage: Array<Express.Multer.File>
  ) {
    return this.flowersService.create(createFlowerDto, listImage);
  }

  @Get()
  search() {
    return this.flowersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.flowersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: ObjectId, @Body() updateFlowerDto: UpdateFlowerDto) {
    return this.flowersService.update(id, updateFlowerDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: ObjectId) {
    return this.flowersService.remove(id);
  }
}
