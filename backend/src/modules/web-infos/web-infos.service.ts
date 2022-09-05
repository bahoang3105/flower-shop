import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiError, ApiOk } from 'src/common/api';
import { Repository } from 'typeorm';
import { UpdateWebInfoDto } from './dto/update-web-info.dto';
import { WebInfo } from './entities/web-info.entity';

@Injectable()
export class WebInfosService {
  constructor(
    @InjectRepository(WebInfo) private webInfosRepository: Repository<WebInfo>
  ) {}
  async find() {
    try {
      const webInfo = await this.webInfosRepository.find();
      return ApiOk(webInfo[0]);
    } catch (e) {
      return ApiError('WebInfo', e);
    }
  }

  async update(id: number, updateWebInfoDto: UpdateWebInfoDto) {
    try {
      const webInfo = await this.webInfosRepository.findOneBy({ id });
      const webInfoUpdated = await this.webInfosRepository.save({
        ...webInfo,
        ...updateWebInfoDto,
      });
      return ApiOk(webInfoUpdated);
    } catch (e) {
      return ApiError('WebInfo', e);
    }
  }
}
