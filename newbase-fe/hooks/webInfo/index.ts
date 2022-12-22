import { QUERY_KEY } from 'constants/routes';
import { useMutation, useQuery } from 'react-query';
import { getWebInfo, updateWebInfo, UpdateWebInfoParamsType } from 'services/webInfo';

export const useGetWebInfo = () => {
  return useQuery([QUERY_KEY.WEB_INFO], getWebInfo, {
    select: (res) => res?.data,
  });
};

export const useUpdateWebInfo = ({ onSuccess }: any) => {
  return useMutation(
    [QUERY_KEY.UPDATE_WEB_INFO],
    ({ params, id }: { params: UpdateWebInfoParamsType; id: number }) => updateWebInfo(params, id),
    {
      onSuccess,
    },
  );
};
