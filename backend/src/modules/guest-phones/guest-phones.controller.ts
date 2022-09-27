import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GuestPhonesService } from './guest-phones.service';
import { CreateGuestPhoneDto } from './dto/create-guest-phone.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchGuestPhoneDto } from './dto/search-guest-phone.dto';
import { DeleteGuestPhoneDto } from './dto/delete-guest-phone.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '../auth/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('guest-phones')
@Controller('guest-phones')
@ApiBearerAuth()
export class GuestPhonesController {
  constructor(private readonly guestPhonesService: GuestPhonesService) {}

  @Post()
  create(@Body() createGuestPhoneDto: CreateGuestPhoneDto) {
    return this.guestPhonesService.create(createGuestPhoneDto);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  search(@Query() searchGuestPhoneDto: SearchGuestPhoneDto) {
    return this.guestPhonesService.search(searchGuestPhoneDto);
  }

  @Delete()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Body() deleteGuestPhoneDto: DeleteGuestPhoneDto) {
    return this.guestPhonesService.remove(deleteGuestPhoneDto);
  }
}
