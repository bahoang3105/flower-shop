import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { UserSex } from 'src/modules/users/entities/user.entity';

export class SignupDto {
  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: false })
  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty()
  sex: UserSex;

  @ApiProperty({ required: true })
  mobilePhone: string;
}
