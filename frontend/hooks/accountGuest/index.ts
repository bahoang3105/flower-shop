import { QUERY_KEY } from 'constants/routes';
import { useQuery } from 'react-query';
import { getAccountGuests } from 'services/accountGuest';

export const useGetAccountGuests = ({ onSuccess, onError, params }: any) => {
  return useQuery([QUERY_KEY.ACCOUNT_GUEST, params], () => getAccountGuests(params), {
    onSuccess,
    onError,
    select: (res) => res?.data || {},
  });
};
