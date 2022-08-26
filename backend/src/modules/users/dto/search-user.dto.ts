import { ApiProperty } from '@nestjs/swagger';
import { SearchDto } from 'src/common/search.dto';
import { UserSex } from 'src/schemas/User.schema';

export class SearchUserDto extends SearchDto {
  @ApiProperty({ required: false })
  sex: UserSex;
}
