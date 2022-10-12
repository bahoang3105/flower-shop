import { QUERY_KEY } from 'constants/routes';
import { useQuery } from 'react-query';
import { getTopics } from 'services/topic';

export const useGetTopics = ({ onSuccess, params }: any) => {
  return useQuery([QUERY_KEY.GET_TOPICS, params], () => getTopics(params), {
    onSuccess,
  });
};
