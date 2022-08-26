import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOkType } from 'src/common/api';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() requestData: SignupDto): Promise<HttpException | ApiOkType> {
    return this.authService.signup(requestData);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() requestData: LoginDto): Promise<HttpException | ApiOkType> {
    return this.authService.login(requestData);
  }
}
