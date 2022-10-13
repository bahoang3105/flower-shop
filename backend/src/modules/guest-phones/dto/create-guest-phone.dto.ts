import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, MaxLength } from 'class-validator';

export class CreateGuestPhoneDto {
  @ApiProperty()
  @MaxLength(20)
  phoneNumber: string;

  @ApiProperty()
  pageAccess: string;

  @ApiProperty()
  pageLink: string;

  @ApiProperty()
  pageTitle: string;

  @ApiProperty()
  @IsDateString()
  timeAccess: Date;
}
