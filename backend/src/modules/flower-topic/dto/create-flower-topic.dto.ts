import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateFlowerTopicDto {
  @ApiProperty({ required: true, type: Number })
  @IsNumber()
  @Type(() => Number)
  flowerId: number;

  @ApiProperty({ required: true, type: Number })
  @Type(() => Number)
  @IsNumber()
  topicId: number;
}
