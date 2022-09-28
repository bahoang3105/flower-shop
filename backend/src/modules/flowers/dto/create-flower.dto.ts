import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { VALUE } from 'src/common/constants';

export class CreateFlowerDto {
  @ApiProperty({ required: true, default: VALUE.DEFAULT_TEXT })
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

  @ApiProperty({ type: ['string'], format: 'binary', required: true })
  files: Express.Multer.File[];

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  quantity: number;

  @ApiProperty({ required: true, default: VALUE.DEFAULT_PRICE })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({ required: false, type: [Number] })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  topicIds: number[];
}
