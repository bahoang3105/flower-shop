import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { SearchDto } from 'src/common/search.dto';

export class SearchFlowerDto extends SearchDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priceFrom: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priceTo: number;

  @ApiProperty({ required: false, type: [Number] })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  topicIds: number[];
}
