import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class CreateGuestPhoneDto {
  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  pageAccess: string;

  @ApiProperty()
  @IsDateString()
  timeAccess: Date;
}
