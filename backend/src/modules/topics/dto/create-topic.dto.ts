import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateTopicDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description: string;

  @ApiProperty({ type: [Number] })
  @IsNumber({}, { each: true })
  flowerIds: number[];
}
