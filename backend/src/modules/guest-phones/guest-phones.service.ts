import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiError, ApiOk } from 'src/common/api';
import { DataSource, Repository } from 'typeorm';
import { CreateGuestPhoneDto } from './dto/create-guest-phone.dto';
import { SearchGuestPhoneDto } from './dto/search-guest-phone.dto';
import { GuestPhone } from './entities/guest-phone.entity';
import { DeleteGuestPhoneDto } from './dto/delete-guest-phone.dto';

@Injectable()
export class GuestPhonesService {
  private logger: Logger = new Logger(GuestPhonesService.name);
  constructor(
    @InjectRepository(GuestPhone)
    private guestPhonesRepository: Repository<GuestPhone>,
    private dataSource: DataSource
  ) {}

  async create(createGuestPhoneDto: CreateGuestPhoneDto) {
    try {
      const newGuestPhone =
        this.guestPhonesRepository.create(createGuestPhoneDto);
      return ApiOk(await this.guestPhonesRepository.save(newGuestPhone));
    } catch (e) {
      this.logger.log('=== Create Guest Phone failed ===', e);
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
        .andWhere('guestPhone.isDeleted = 0');

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

      queryBuilder
        .orderBy(sortField, sortValue)
        .skip(limit * (page - 1))
        .take(limit)
      
      const [items, totalItems] = await queryBuilder.getManyAndCount();
      return ApiOk({
        items,
        meta: {
          totalItems,
          itemCount: items.length,
        }
      });
    } catch (e) {
      this.logger.log('=== Search Guest Phone failed ===', e);
      return ApiError('guestPhone', e);
    }
  }

  async remove(deleteGuestPhoneDto: DeleteGuestPhoneDto) {
    const { listGuestPhoneId } = deleteGuestPhoneDto;
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.startTransaction();
      await Promise.all(
        listGuestPhoneId.map((guestPhoneId: number) => {
          return queryRunner.manager.update(
            GuestPhone,
            { id: guestPhoneId },
            { isDeleted: true }
          );
        })
      );
      await queryRunner.commitTransaction();
      return ApiOk({ success: true });
    } catch (e) {
      this.logger.log('=== Remove Guest Phone failed ===', e);
      await queryRunner.rollbackTransaction();
      return ApiError('guestPhone', e);
    } finally {
      await queryRunner.release();
    }
  }
}
