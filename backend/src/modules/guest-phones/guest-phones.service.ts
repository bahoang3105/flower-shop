import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiError, ApiOk } from 'src/common/api';
import { Repository } from 'typeorm';
import { CreateGuestPhoneDto } from './dto/create-guest-phone.dto';
import { SearchGuestPhoneDto } from './dto/search-guest-phone.dto';
import { GuestPhone } from './entities/guest-phone.entity';

@Injectable()
export class GuestPhonesService {
  constructor(
    @InjectRepository(GuestPhone)
    private guestPhonesRepository: Repository<GuestPhone>
  ) {}
  async create(createGuestPhoneDto: CreateGuestPhoneDto) {
    try {
      const newGuestPhone =
        this.guestPhonesRepository.create(createGuestPhoneDto);
      return ApiOk(await this.guestPhonesRepository.save(newGuestPhone));
    } catch (e) {
      return ApiError('guestPhone', e);
    }
  }

  async search(searchGuestPhoneDto: SearchGuestPhoneDto) {
    try {
      const guestPhoneList = await this.guestPhonesRepository
        .createQueryBuilder('guest-phone')
        .getMany();
      return ApiOk(guestPhoneList);
    } catch (e) {
      return ApiError('guestPhone', e);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} guestPhone`;
  }
}
