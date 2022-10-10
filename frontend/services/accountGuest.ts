import { API_URL } from 'constants/routes';
import { api } from './api';

export const getAccountGuests = (params: any) => {
  return api.get(API_URL.ACCOUNT_GUEST, params);
};
