import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { ApiError, ApiOk } from 'src/common/api';
import { AwsUtils } from 'src/common/aws.util';
import { Flower, FlowerDocument } from 'src/schemas/Flower.schema';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';

@Injectable()
export class FlowersService {
  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection,
    @InjectModel(Flower.name) private flowerModel: Model<FlowerDocument>
  ) {}
  async create(
    createFlowerDto: CreateFlowerDto,
    listImage: Express.Multer.File[]
  ) {
    const session = await this.connection.startSession();
    try {
      await session.withTransaction(async () => {
        // upload list image to S3
        const uploadList = listImage.map((image) =>
          AwsUtils.uploadS3(
            image.buffer,
            image.mimetype,
            `${new Date().getTime()}-${image.filename}`
          )
        );
        const uploadedList = Promise.all(listImage);
        const createdFlower = new this.flowerModel({
          ...createFlowerDto,
          listImage: uploadedList,
        });
        return ApiOk(await createdFlower.save());
      });
    } catch (e) {
      return ApiError('e10', e);
    } finally {
      session.endSession();
    }
  }

  findAll() {
    return `This action returns all flowers`;
  }

  async findOne(id: ObjectId) {
    try {
      const flower = await this.flowerModel.findById(id);
      return ApiOk(flower);
    } catch (e) {
      return ApiError('E12', e);
    }
  }

  async update(id: ObjectId, updateFlowerDto: UpdateFlowerDto) {
    try {
      const flower = await this.flowerModel.findByIdAndUpdate(
        id,
        updateFlowerDto
      );
      return ApiOk(flower);
    } catch (e) {
      return ApiError('E14', e);
    }
  }

  async remove(id: ObjectId) {
    try {
      const flower = await this.flowerModel.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      return ApiOk(flower);
    } catch (e) {
      return ApiError('E15', e);
    }
  }
}
