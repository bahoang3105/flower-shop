import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiError, ApiOk } from 'src/common/api';
import { DataSource, Repository } from 'typeorm';
import { CreateGuestPhoneDto } from './dto/create-guest-phone.dto';
import { SearchGuestPhoneDto } from './dto/search-guest-phone.dto';
import { GuestPhone } from './entities/guest-phone.entity';
import { paginate } from 'nestjs-typeorm-paginate';

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
    const { limit, page, keyword, sortField, sortValue } = searchGuestPhoneDto;
    try {
      const queryBuilder = this.guestPhonesRepository
        .createQueryBuilder('guestPhone')
        .where('guestPhone.phoneNumber like :keyword', {
          keyword: `%${keyword}%`,
        })
        .andWhere('guestPhone.isDeleted = false')
        .orderBy(sortField, sortValue);
      return ApiOk(await paginate(queryBuilder, { limit, page }));
    } catch (e) {
      return ApiError('guestPhone', e);
    }
  }

  async remove(phoneNumber: string) {
    try {
      await this.guestPhonesRepository
        .createQueryBuilder()
        .update()
        .set({
          isDeleted: true,
        })
        .where('phoneNumber = :phoneNumber', { phoneNumber })
        .execute();
      return ApiOk({ success: true });
    } catch (e) {
      return ApiError('guestPhone', e);
    }
  }
}
