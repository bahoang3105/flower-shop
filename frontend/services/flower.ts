import { API_URL } from 'constants/routes';
import { api } from './api';

export const createFlower = (formData: FormData) => {
  return api.postMultiplePart(API_URL.FLOWERS, formData);
};

export const getFlowers = (params: any) => {
  return api.get(API_URL.FLOWERS, params);
};

export const getFlowerDetail = (id: string) => {
  return api.get(API_URL.FLOWERS + '/' + id);
};

export const updateFlower = (id: string, params: any) => {
  return api.patch(API_URL.FLOWERS + '/' + id, params);
};
