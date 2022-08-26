import {
  Controller,
  Get,
  HttpException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { SearchUserDto } from './dto/search-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiOkType } from 'src/common/api';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('search')
  searchUser(
    @Query() searchUserDto: SearchUserDto
  ): Promise<HttpException | ApiOkType> {
    return this.usersService.searchUser(searchUserDto);
  }
}
