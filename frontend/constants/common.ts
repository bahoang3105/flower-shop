export const LOCAL_STORAGE = {
  TOKEN: 'token',
};

export const TYPE_MESSAGE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  IMG_DONE: 'done',
};

export const SORT_TYPE = {
  ASC: 'ASC',
  DESC: 'DESC',
};

export const DATE_FORMAT = {
  FULL_TIME: 'DD-MM-YYYY HH:mm:ss',
  DATE_MONTH_YEAR: 'DD-MM-YYYY',
};

export const APP_URL = {
  HOME: '/',
  PRODUCT_LIST: '/shop/product-list',
  PRODUCT_DETAIL: '/shop/product/[id]',
};

export type appBreadcrumbType = 'product-list' | 'shop' | 'product';

export const BREADCRUMB_TEXT = {
  ['shop']: 'Home',
  ['product-list']: 'Product List',
  ['product']: 'Product',
};

export const BREADCRUMB_LINK = {
  ['shop']: APP_URL.HOME,
  ['product-list']: APP_URL.PRODUCT_LIST,
  ['product']: APP_URL.PRODUCT_DETAIL,
};
