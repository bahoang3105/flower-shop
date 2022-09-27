import { Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/common/BaseTransaction';
import { DataSource, EntityManager } from 'typeorm';
import { GuestPhone } from './entities/guest-phone.entity';

@Injectable()
export class DeleteGuestPhoneTransaction extends BaseTransaction<
  number[],
  void
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    listGuestPhoneId: number[],
    manager: EntityManager
  ): Promise<void> {
    await Promise.all(
      listGuestPhoneId.map((guestPhoneId: number) => {
        manager.update(GuestPhone, { id: guestPhoneId }, { isDeleted: true });
      })
    );
  }
}
