import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFlowerDto {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  color: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  size: string | null;

  @ApiProperty({ type: [String], format: 'binary', required: true })
  files: Express.Multer.File[];

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  quantity: number | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price: number | null;
}
