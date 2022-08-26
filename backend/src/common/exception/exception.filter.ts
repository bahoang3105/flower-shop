import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const status = exception.getStatus();

    const errorName = exception['name'];
    if (errorName === 'ValidationError') {
      response.status(400).json({
        statusCode: 400,
        message: exception['message'],
      });
    } else {
      super.catch(exception, host);
    }
  }
}
