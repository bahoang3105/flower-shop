import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateTopicDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description: string;

  @ApiProperty({ required: false, type: [Number] })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  flowerIds: number[];
}
