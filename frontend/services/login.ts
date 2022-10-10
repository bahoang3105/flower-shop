import { API_URL } from 'constants/routes';
import { api } from './api';

export const login = (params: { username: string; password: string }) => {
  return api.post(API_URL.LOGIN, params);
};

export const verifyAdmin = () => {
  return api.get(API_URL.VERIFY_ADMIN);
};
