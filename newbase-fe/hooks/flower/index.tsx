import { QUERY_KEY } from 'constants/routes';
import { useMutation, useQuery } from 'react-query';
import { createFlower, getFlowers, getFlowerDetail, updateFlower, deleteFlower } from 'services/flower';

export const useCreateFlower = ({ onSuccess }: any) => {
  return useMutation([QUERY_KEY.CREATE_FLOWER], (formData: FormData) => createFlower(formData), {
    onSuccess,
  });
};

export const useGetFlowers = ({ params }: any) => {
  return useQuery([QUERY_KEY.GET_FLOWERS, params], () => getFlowers(params), {
    select: (res) => res?.data?.data || {},
    enabled: !(params?.topicIds?.length > 0 && params?.topicIds?.[0] === 'undefined')
  });
};

export const useGetDetailFlower = (id: string) => {
  return useQuery([QUERY_KEY.DETAIL_FLOWER, id], () => getFlowerDetail(id), {
    select: (res) => res?.data?.data || {},
    enabled: id !== 'undefined',
  });
};

export const useUpdateFlower = ({ id, onSuccess }: { id: string; onSuccess: any }) => {
  return useMutation([QUERY_KEY.UPDATE_FLOWER, id], (formData: FormData) => updateFlower(id, formData), {
    onSuccess,
  });
};

export const useDeleteFlower = ({ id, onSuccess }: { id: string; onSuccess: any }) => {
  return useMutation([QUERY_KEY.DELETE_FLOWER, id], () => deleteFlower(id), {
    onSuccess,
  });
};
