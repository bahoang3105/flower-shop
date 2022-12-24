import { QUERY_KEY } from 'constants/routes';
import { useQuery, useMutation } from 'react-query';
import { createTopic, deleteTopic, getTopicDetail, getTopics, updateTopic } from 'services/topic';

export const useGetTopics = ({ onSuccess, params }: any) => {
  return useQuery([QUERY_KEY.GET_TOPICS, params], () => getTopics(params), {
    onSuccess,
    select: (res) => res.data,
  });
};

export const useCreateTopic = ({ onSuccess }: any) => {
  return useMutation([QUERY_KEY.CREATE_TOPIC], (params: any) => createTopic(params), {
    onSuccess,
  });
};

export const useGetDetailTopic = (id: string) => {
  return useQuery([QUERY_KEY.DETAIL_TOPIC, id], () => getTopicDetail(id), {
    select: (res) => res?.data?.data || {},
    enabled: id !== 'undefined',
  });
};

export const useUpdateTopic = ({ id, onSuccess }: { id: string; onSuccess: any }) => {
  return useMutation([QUERY_KEY.UPDATE_TOPIC, id], (params) => updateTopic(id, params), {
    onSuccess,
  });
};

export const useDeleteTopic = ({ id, onSuccess }: { id: string; onSuccess: any }) => {
  return useMutation([QUERY_KEY.DELETE_TOPIC, id], () => deleteTopic(id), {
    onSuccess,
  });
};
