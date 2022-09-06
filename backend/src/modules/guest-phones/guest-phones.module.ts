import { Module } from '@nestjs/common';
import { GuestPhonesService } from './guest-phones.service';
import { GuestPhonesController } from './guest-phones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestPhone } from './entities/guest-phone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GuestPhone])],
  controllers: [GuestPhonesController],
  providers: [GuestPhonesService],
})
export class GuestPhonesModule {}
