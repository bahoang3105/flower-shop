import { SORT_TYPE } from 'constants/common';

export const formatAddress = (address: string, start = 6, end = 4) => {
  return address.slice(0, start) + '...' + address.slice(-end);
};

export const formatNumber = (value: number, numberOfDecimals = 3) => {
  const splitNumber = String(value).split('.');
  const integerPart = splitNumber[0];
  const decimalPart = splitNumber[1];
  const formattedInteger = new Intl.NumberFormat('en-us').format(Number(integerPart));
  let formattedDecimal = '';
  if (decimalPart !== undefined) {
    if (decimalPart?.length <= numberOfDecimals) {
      formattedDecimal = '.' + decimalPart;
    } else {
      formattedDecimal = '.' + Math.round(Number(decimalPart) / Math.pow(10, decimalPart.length - numberOfDecimals));
    }
  }
  return formattedInteger + formattedDecimal;
};

export const calculateNo = (curPage: number, pageSize: number, index: number) => {
  return pageSize * (curPage - 1) + index + 1;
};

export const formatSorter = (order: any) => {
  if (order === 'ascend') return SORT_TYPE.ASC;
  return SORT_TYPE.DESC;
};

export const DATE_FORMAT = {
  FULL_TIME: 'DD-MM-YYYY HH:mm:ss',
};
