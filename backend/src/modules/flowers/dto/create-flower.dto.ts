import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFlowerDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  color: string;

  @ApiProperty()
  @IsOptional()
  size: string | null;

  @ApiProperty({ type: [String], format: 'binary', required: true })
  files: Express.Multer.File[];

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  quantity: number;

  @ApiProperty({ required: true })
  @Type(() => Number)
  @IsNumber()
  price: number;
}
