import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiError, ApiOk } from 'src/common/api';
import { Repository } from 'typeorm';
import { CreateGuestPhoneDto } from './dto/create-guest-phone.dto';
import { SearchGuestPhoneDto } from './dto/search-guest-phone.dto';
import { GuestPhone } from './entities/guest-phone.entity';
import { paginate } from 'nestjs-typeorm-paginate';
import { DeleteGuestPhoneDto } from './dto/delete-guest-phone.dto';
import { DeleteGuestPhoneTransaction } from './guest-phones-transaction';

@Injectable()
export class GuestPhonesService {
  constructor(
    @InjectRepository(GuestPhone)
    private guestPhonesRepository: Repository<GuestPhone>,
    private readonly deleteGuestPhoneTransaction: DeleteGuestPhoneTransaction
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
    const {
      limit,
      page,
      keyword,
      sortField,
      sortValue,
      pageAccess,
      fromTimeAccess,
      toTimeAccess,
    } = searchGuestPhoneDto;
    try {
      const queryBuilder = this.guestPhonesRepository
        .createQueryBuilder('guestPhone')
        .where('guestPhone.phoneNumber like :keyword', {
          keyword: `%${keyword}%`,
        })
        .andWhere('guestPhone.isDeleted = false');
      if (pageAccess) {
        queryBuilder.andWhere('guestPhone.pageAccess = :pageAccess', {
          pageAccess,
        });
      }
      if (fromTimeAccess) {
        queryBuilder.andWhere('guestPhone.timeAccess >= :fromTimeAccess', {
          fromTimeAccess,
        });
      }
      if (toTimeAccess) {
        queryBuilder.andWhere('guestPhone.timeAccess <= :toTimeAccess', {
          toTimeAccess,
        });
      }
      queryBuilder.orderBy(sortField, sortValue);
      return ApiOk(await paginate(queryBuilder, { limit, page }));
    } catch (e) {
      return ApiError('guestPhone', e);
    }
  }

  async remove(deleteGuestPhoneDto: DeleteGuestPhoneDto) {
    const { listPhoneNumberId } = deleteGuestPhoneDto;
    try {
      await this.deleteGuestPhoneTransaction.run(listPhoneNumberId);
      return ApiOk({ success: true });
    } catch (e) {
      return ApiError('guestPhone', e);
    }
  }
}
