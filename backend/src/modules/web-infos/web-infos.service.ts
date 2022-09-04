import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ApiError, ApiOk } from 'src/common/api';
import { WebInfo, WebInfoDocument } from 'src/schemas/WebInfo.schema';
import { UpdateWebInfoDto } from './dto/update-web-info.dto';

@Injectable()
export class WebInfosService {
  constructor(
    @InjectModel(WebInfo.name) private webInfoModel: Model<WebInfoDocument>
  ) {}
  async findAll() {
    try {
      const listInfo = await this.webInfoModel.find();
      return ApiOk(listInfo);
    } catch (e) {
      return ApiError('E30', e);
    }
  }

  async update(id: ObjectId, updateWebInfoDto: UpdateWebInfoDto) {
    try {
      const webInfo = await this.webInfoModel.findByIdAndUpdate(
        id,
        updateWebInfoDto
      );
      return ApiOk(webInfo);
    } catch (e) {
      return ApiError('E31', e);
    }
  }
}
