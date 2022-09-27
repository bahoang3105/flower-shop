import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiError, ApiOk } from 'src/common/api';
import { Repository } from 'typeorm';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { Flower } from './entities/flower.entity';

@Injectable()
export class FlowersService {
  constructor(
    @InjectRepository(Flower) private flowersRepository: Repository<Flower>
  ) {}
  create(createFlowerDto: CreateFlowerDto) {
    return 'This action adds a new flower';
  }

  findAll() {
    return `This action returns all flowers`;
  }

  async findById(id: number) {
    try {
      return ApiOk(this.findById(id));
    } catch (e) {
      return ApiError('flower', e);
    }
  }

  update(id: number, updateFlowerDto: UpdateFlowerDto) {
    return `This action updates a #${id} flower`;
  }

  remove(id: number) {
    return `This action removes a #${id} flower`;
  }
}
