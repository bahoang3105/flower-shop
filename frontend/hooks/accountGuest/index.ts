import { QUERY_KEY } from 'constants/routes';
import { useMutation, useQuery } from 'react-query';
import { deleteAccountGuests, getAccountGuests } from 'services/accountGuest';

export const useGetAccountGuests = ({ onSuccess, onError, params }: any) => {
  return useQuery([QUERY_KEY.ACCOUNT_GUEST, params], () => getAccountGuests(params), {
    onSuccess,
    onError,
    select: (res) => res?.data || {},
  });
};

export const useDeleteAccountGuests = ({ onSuccess }: any) => {
  return useMutation([QUERY_KEY.DELETE_ACCOUNT_GUEST], (params: any) => deleteAccountGuests(params), {
    onSuccess,
  });
};
