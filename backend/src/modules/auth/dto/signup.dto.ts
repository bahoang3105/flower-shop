import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';
import { UserSex } from 'src/modules/users/entities/user.entity';

export class SignupDto {
  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  sex: UserSex;

  @ApiProperty({ required: true })
  mobilePhone: string;
}
