import { HttpException } from '@nestjs/common';

export type ApiOkType = {
  data: object;
};

export function ApiError(code = '', message: string | object): HttpException {
  return new HttpException(
    {
      code,
      message,
    },
    400
  );
}

export function ApiOk(data: object): ApiOkType {
  return {
    data,
  };
}
