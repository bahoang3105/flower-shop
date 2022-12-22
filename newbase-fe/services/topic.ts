import { API_URL } from 'constants/routes';
import { api } from './api';

export const getTopics = (params: any) => {
  return api.get(API_URL.TOPICS, params);
};
