import { API_URL } from 'constants/routes';
import { api } from './api';

export const getTopics = (params: any) => {
  return api.get(API_URL.TOPICS, params);
};

export const createTopic = (params: any) => {
  return api.post(API_URL.TOPICS, params);
};
export const getTopicDetail = (id: string) => {
  return api.get(API_URL.TOPICS + '/' + id);
};
export const updateTopic = (id: string, params: any) => {
  return api.patch(API_URL.TOPICS + '/' + id, params);
};
export const deleteTopic = (id: string) => {
  return api.delete(API_URL.TOPICS + '/' + id);
};
