import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateWebInfoDto {
  @ApiProperty()
  @IsOptional()
  mobilePhone: string;

  @ApiProperty()
  @IsOptional()
  zaloLink: string;

  @ApiProperty()
  @IsOptional()
  facebookLink: string;

  @ApiProperty()
  @IsOptional()
  email: string;
}
