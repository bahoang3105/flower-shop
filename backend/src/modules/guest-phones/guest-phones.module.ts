import { Module } from '@nestjs/common';
import { GuestPhonesService } from './guest-phones.service';
import { GuestPhonesController } from './guest-phones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestPhone } from './entities/guest-phone.entity';
import { DeleteGuestPhoneTransaction } from './guest-phones-transaction';

@Module({
  imports: [TypeOrmModule.forFeature([GuestPhone])],
  controllers: [GuestPhonesController],
  providers: [GuestPhonesService, DeleteGuestPhoneTransaction],
})
export class GuestPhonesModule {}
