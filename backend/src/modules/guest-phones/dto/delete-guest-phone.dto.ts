import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';

export class DeleteGuestPhoneDto {
  @ApiProperty()
  @Type(() => Number)
  @IsArray()
  @IsNumber({}, { each: true })
  listGuestPhoneId: number[];
}
