import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GuestPhonesService } from './guest-phones.service';
import { CreateGuestPhoneDto } from './dto/create-guest-phone.dto';
import { ApiTags } from '@nestjs/swagger';
import { SearchGuestPhoneDto } from './dto/search-guest-phone.dto';

@ApiTags('guest-phones')
@Controller('guest-phones')
export class GuestPhonesController {
  constructor(private readonly guestPhonesService: GuestPhonesService) {}

  @Post()
  create(@Body() createGuestPhoneDto: CreateGuestPhoneDto) {
    return this.guestPhonesService.create(createGuestPhoneDto);
  }

  @Get()
  search(@Query() searchGuestPhoneDto: SearchGuestPhoneDto) {
    return this.guestPhonesService.search(searchGuestPhoneDto);
  }

  @Delete(':phoneNumber')
  remove(@Param('phoneNumber') phoneNumber: string) {
    return this.guestPhonesService.remove(phoneNumber);
  }
}
