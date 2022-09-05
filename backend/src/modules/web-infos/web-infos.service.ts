import { Injectable } from '@nestjs/common';
import { CreateWebInfoDto } from './dto/create-web-info.dto';
import { UpdateWebInfoDto } from './dto/update-web-info.dto';

@Injectable()
export class WebInfosService {
  create(createWebInfoDto: CreateWebInfoDto) {
    return 'This action adds a new webInfo';
  }

  findAll() {
    return `This action returns all webInfos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} webInfo`;
  }

  update(id: number, updateWebInfoDto: UpdateWebInfoDto) {
    return `This action updates a #${id} webInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} webInfo`;
  }
}
