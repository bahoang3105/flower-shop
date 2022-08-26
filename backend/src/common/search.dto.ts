import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

enum SortValue {
  ASC = 1,
  DESC = 2,
}

export class SearchDto {
  @ApiProperty({ required: false })
  keyword: string = '';

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  limit: number = 10;

  @ApiProperty({ required: false })
  sortField: string;

  @ApiProperty({ required: false })
  sortValue: SortValue;
}
