import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupDto } from '../auth/dto/signup.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  findByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  create(user: SignupDto) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }
}
