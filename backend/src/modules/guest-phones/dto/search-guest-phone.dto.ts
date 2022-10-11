import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsOptional } from 'class-validator';
import { SearchDto } from 'src/common/search.dto';

export class SearchGuestPhoneDto extends SearchDto {
  @ApiProperty({ required: false })
  pageAccess: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  fromTimeAccess: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  toTimeAccess: Date;
}
