import { PartialType } from '@nestjs/swagger';
import { CreateWebInfoDto } from './create-web-info.dto';

export class UpdateWebInfoDto extends PartialType(CreateWebInfoDto) {}
