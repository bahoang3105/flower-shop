import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiOk, ApiOkType } from 'src/common/api';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Role } from './role.enum';

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

  @Get('verify-admin')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  verifyAdmin(): HttpException | ApiOkType {
    return ApiOk({ role: Role.Admin });
  }
}
