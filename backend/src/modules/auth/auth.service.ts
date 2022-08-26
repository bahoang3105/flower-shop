import { HttpException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiError, ApiOk, ApiOkType } from 'src/common/api';
import { Utils } from 'src/common/utils';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
/**
 * AuthService
 */
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  /**
   * Signup
   * @param {SignupDto} requestData
   * @return {any} user information
   */
  async signup(requestData: SignupDto): Promise<HttpException | ApiOkType> {
    const { username } = requestData;
    const checkExist = await this.usersService.findUserByUsername(username);
    if (checkExist) {
      return ApiError('E1', 'Username existed');
    }
    const newUser = {
      ...requestData,
      password: Utils.encrypt(requestData.password),
    };
    try {
      return ApiOk(await this.usersService.create(newUser));
    } catch (e) {
      return ApiError('E3', '');
    }
  }

  /**
   * Login
   * @param {LoginDto} requestData
   * @return {Promise<HttpException | ApiOkType>} user information
   */
  async login(requestData: LoginDto): Promise<HttpException | ApiOkType> {
    const { username, password } = requestData;
    const checkUser = await this.usersService.findUserByUsername(username);
    if (!checkUser) {
      return ApiError('E2', 'Wrong username or password');
    }
    const decryptPassword = Utils.decrypt(checkUser.password);
    if (decryptPassword !== password) {
      return ApiError('E2', 'Wrong username or password');
    }
    checkUser.password = undefined;
    const { role } = checkUser;
    return ApiOk({
      role,
      username,
      token: this.jwtService.sign({ username, role }),
    });
  }
}
