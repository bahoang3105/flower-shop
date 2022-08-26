import { Injectable } from '@nestjs/common';

@Injectable()
/**
 * App Service
 */
export class AppService {
  /**
   * Hello world
   * @return {string} Hello message
   */
  getHello(): string {
    return 'Hello World!';
  }
}
