import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiError, ApiOk } from 'src/common/api';
import { Repository } from 'typeorm';
import { UpdateWebInfoDto } from './dto/update-web-info.dto';
import { WebInfo } from './entities/web-info.entity';

@Injectable()
export class WebInfosService {
  private logger: Logger = new Logger(WebInfosService.name);
  constructor(
    @InjectRepository(WebInfo) private webInfosRepository: Repository<WebInfo>
  ) {}
  async find() {
    try {
      const webInfo = await this.webInfosRepository.find();
      return ApiOk(webInfo[0]);
    } catch (e) {
      this.logger.log('=== Search Web Info failed ===', e);
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
      this.logger.log('=== Update Web Info failed ===', e);
      return ApiError('WebInfo', e);
    }
  }

  async create(updateWebInfoDto: UpdateWebInfoDto) {
    try {
      const webInfo = this.webInfosRepository.create(updateWebInfoDto);
      return ApiOk(await this.webInfosRepository.save(webInfo));
    } catch (e) {
      this.logger.log('=== Create Web Info failed ===', e);
      return ApiError('WebInfo', e);
    }
  }
}
