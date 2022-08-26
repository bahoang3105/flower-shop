import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectID } from 'bson';
import { MESSAGE } from '../constants';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, ObjectID> {
  public transform(value: string): ObjectID {
    try {
      const transformedObjectId: ObjectID = ObjectID.createFromHexString(value);
      return transformedObjectId;
    } catch (error) {
      throw new BadRequestException(MESSAGE.ERR_OBJECT_ID);
    }
  }
}
