import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { VALUE } from 'src/common/constants';

export class UpdateFlowerDto {
  @ApiProperty({ required: true, default: VALUE.DEFAULT_TEXT })
  @IsOptional()
  @IsString()
  @MaxLength(VALUE.MAX_LENGTH_NAME)
  name: string;

  @ApiProperty()
  @MaxLength(VALUE.MAX_LENGTH_DES)
  @IsOptional()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  color: string;

  @ApiProperty({ required: false })
  @IsOptional()
  size: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  quantity: number;

  @ApiProperty({ required: true, default: VALUE.DEFAULT_PRICE })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price: number;
}
