import { SearchUserDto } from 'src/modules/users/dto/search-user.dto';
import { UserSex } from 'src/schemas/User.schema';

export class UserUtils {
  public static matchSearchUser = (
    userDto: SearchUserDto
  ): { $or; sex: UserSex } => {
    const { keyword, sex } = userDto;
    const match = {
      $or: undefined,
      sex: undefined,
    };
    if (keyword) {
      match.$or = [
        {
          username: {
            $regex: keyword,
            $options: 'i',
          },
        },
        {
          name: {
            $regex: keyword,
            $options: 'i',
          },
        },
      ];
    }
    if (sex) {
      match.sex = sex;
    }
    return match;
  };
}
