import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DeleteGuestPhoneDto {
  @ApiProperty()
  @IsNumber({}, { each: true })
  listGuestPhoneId: number[];
}
