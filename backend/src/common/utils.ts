import { Logger } from '@nestjs/common';
import ObjectID from 'bson-objectid';
import { Types } from 'mongoose';
import BigNumber from 'bignumber.js';
const CryptoJS = require('crypto-js');

export class Utils {
  private static readonly logger = new Logger(Utils.name);

  /**
   * Check string is Mongo ObjectId
   * @param {string} str
   * @return {boolean}
   */
  public static isObjectId(str: string): boolean {
    try {
      new Types.ObjectId(str);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Convert string to Mongo ObjectId
   * @param {string} str
   * @return {ObjectId}
   */
  public static toObjectId(str: string): Types.ObjectId {
    return new Types.ObjectId(str);
  }

  /**
   * Create mongodb id
   * @return {ObjectId}
   */
  public static createObjectId(): Types.ObjectId {
    return new Types.ObjectId(new ObjectID());
  }

  /**
   * Convert array string to array Mongo ObjectId
   * @param {string[]} strList
   * @return {Types.ObjectId[]}
   */
  public static toObjectIds(strList: string[]): Types.ObjectId[] {
    return strList.map((str) => this.toObjectId(str));
  }

  /**
   * Convert price
   * @param {any} value
   * @param {number} coinDecimal
   * @return {string}
   */
  public static convertPrice(value, coinDecimal = 18): string {
    BigNumber.config({
      EXPONENTIAL_AT: 100,
    });
    return new BigNumber(value)
      .multipliedBy(new BigNumber(Math.pow(10, coinDecimal)))
      .toString();
  }

  /**
   * Get random element from array
   * @param {any[]} array
   * @return {any}
   */
  public static getRandom(array): any {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Wait
   * @param {number} ms
   * @return {Promise}
   */
  public static wait(ms): Promise<unknown> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  /**
   * Retry a promise function
   * @param {any} operation
   * @param {number} retries
   * @param {number} delay
   * @return {Promise<any>}
   */
  public static retryFn(
    operation: any,
    retries: number = 3,
    delay: number = 500
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      return operation()
        .then(resolve)
        .catch((reason) => {
          if (retries > 0) {
            return Utils.wait(delay)
              .then(this.retryFn.bind(null, operation, retries - 1, delay))
              .then(resolve)
              .catch(reject);
          }
          return reject(reason);
        });
    });
  }

  /**
   * Encrypt
   * @param {string} str
   * @return {string}
   */
  public static encrypt(str: string): string {
    return CryptoJS.AES.encrypt(str, process.env.CRYPTO_SECRET).toString();
  }

  /**
   * Decrypt
   * @param {string} cipherText
   * @return {string}
   */
  public static decrypt(cipherText: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherText, process.env.CRYPTO_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  /**
   * Paginate
   * @param {any} model
   * @param {any} match
   * @param {any} query
   * @return {Promise<any>}
   */
  public static paginate(model, match, query): Promise<any> {
    this.logger.debug('paginate(): match', JSON.stringify(match));
    const pagingOptions = {
      page: query.page,
      limit: query.limit,
      sort: query.sort ? query.sort : { createdAt: 'desc' },
      projection: undefined,
    };
    if (query.projection) {
      pagingOptions.projection = {};
      for (const [key, value] of Object.entries(query.projection)) {
        if (value !== '0' && value !== '1') {
          continue;
        }
        pagingOptions.projection[key] = Number(value);
      }
    }
    this.logger.debug(
      'paginate(): pagingOptions',
      JSON.stringify(pagingOptions)
    );
    return model.paginate(match, pagingOptions);
  }

  /**
   * Paginate
   * @param {any} model
   * @param {any} pipe
   * @param {any} query
   * @return {Promise<any>}
   */
  public static aggregatePaginate(model, pipe, query): Promise<any> {
    this.logger.debug('aggregatePaginate(): match', JSON.stringify(pipe));
    const pagingOptions = {
      page: query.page,
      limit: query.limit,
      sort: query.sort ? query.sort : { createdAt: 'desc' },
      projection: undefined,
    };
    if (query.projection) {
      pagingOptions.projection = query.projection;
    }
    return model.aggregatePaginate(model.aggregate(pipe), pagingOptions);
  }
}
