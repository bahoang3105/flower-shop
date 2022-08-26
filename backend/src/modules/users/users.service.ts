import { HttpException, Injectable } from '@nestjs/common';
import { Document, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/User.schema';
import { UserUtils } from 'src/modules/users/user.utils';
import { Utils } from 'src/common/utils';
import { ApiOk, ApiOkType } from 'src/common/api';
import { SignupDto } from '../auth/dto/signup.dto';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: SignupDto): Promise<
    User &
      Document & {
        _id: Types.ObjectId;
      }
  > {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findUserByUsername(username: string): Promise<
    User &
      Document & {
        _id: Types.ObjectId;
      }
  > {
    const user = await this.userModel.findOne({ username });
    return user;
  }

  async findUserByUsernameWithoutPassword(username: string): Promise<
    User &
      Document & {
        _id: Types.ObjectId;
      }
  > {
    const user = await this.userModel.findOne({ username });
    if (user) {
      user.password = undefined;
    }
    return user;
  }

  async searchUser(
    searchUserDto: SearchUserDto
  ): Promise<HttpException | ApiOkType> {
    const $match = UserUtils.matchSearchUser(searchUserDto);
    const searchUserPipeline = [
      {
        $match,
      },
      {
        $project: {
          password: 0,
        },
      },
    ];
    const result = await Utils.aggregatePaginate(
      this.userModel,
      searchUserPipeline,
      searchUserDto
    );
    return ApiOk(result);
  }
}
