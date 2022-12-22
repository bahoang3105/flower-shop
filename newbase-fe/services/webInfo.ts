import { API_URL } from 'constants/routes';
import { api } from './api';

export type UpdateWebInfoParamsType = {
  title: string;
  zaloLink: string;
  facebookLink: string;
  mobilePhone: string;
  email: string;
  address: string;
};

export const getWebInfo = () => {
  return api.get(API_URL.WEB_INFO);
};

export const updateWebInfo = (params: UpdateWebInfoParamsType, id: number) => {
  return api.post(API_URL.WEB_INFO + '/' + id, params);
};
