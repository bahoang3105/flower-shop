import { API_URL } from 'constants/routes';
import { api } from './api';

export const createFlower = (formData: FormData) => {
  return api.postMultiplePart(API_URL.CREATE_FLOWER, formData);
};

export const getFlowers = (params: any) => {
  return api.get(API_URL.GET_FLOWERS, params);
};
