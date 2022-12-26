import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { VALUE } from 'src/common/constants';
import { SearchDto } from 'src/common/search.dto';

export class SearchTopicDto extends SearchDto {
  @ApiProperty({ required: false, default: VALUE.DEFAULT_FLOWERS_PER_TOPIC })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  flowersPerTopic: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  getEmptyTopic: boolean;
}
