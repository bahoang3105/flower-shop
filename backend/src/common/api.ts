import { HttpException } from '@nestjs/common';

export type ApiOkType = {
  data: object;
};

export function ApiError(code = '', message: string | object): HttpException {
  throw new HttpException(
    {
      code,
      message,
    },
    (message as any)?.status || 400
  );
}

export function ApiOk(data: object): ApiOkType {
  return {
    data,
  };
}
