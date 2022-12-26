import { LOCAL_STORAGE } from "constants/common";
import { QUERY_KEY } from "constants/routes";
import { useMutation, useQuery } from "react-query";
import { deleteAccountGuests, getAccountGuests } from "services/accountGuest";
import { getToken } from "services/api";

export const useGetAccountGuests = ({ onSuccess, onError, params }: any) => {
  const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
  if (token) {
    getToken(token);
  }
  return useQuery(
    [QUERY_KEY.ACCOUNT_GUEST, params],
    () => getAccountGuests(params),
    {
      onSuccess,
      onError,
      select: (res: any) => res?.data || {},
    }
  );
};

export const useDeleteAccountGuests = ({ onSuccess }: any) => {
  return useMutation(
    [QUERY_KEY.DELETE_ACCOUNT_GUEST],
    (params: any) => deleteAccountGuests(params),
    {
      onSuccess,
    }
  );
};
