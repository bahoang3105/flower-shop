import { QUERY_KEY } from 'constants/routes';
import { useMutation, useQuery } from 'react-query';
import { createFlower, getFlowers, getFlowerDetail } from 'services/flower';

export const useCreateFlower = ({ onSuccess }: any) => {
  return useMutation([QUERY_KEY.CREATE_FLOWER], (formData: FormData) => createFlower(formData), {
    onSuccess,
  });
};

export const useGetFlowers = ({ params }: any) => {
  return useQuery([QUERY_KEY.GET_FLOWERS, params], () => getFlowers(params), {
    select: (res) => res?.data?.data || {},
  });
};

export const useGetDetailFlower = (id: string) => {
  return useQuery([QUERY_KEY.DETAIL_FLOWER, id], () => getFlowerDetail(id), {
    select: (res) => res?.data?.data || {},
  });
};
