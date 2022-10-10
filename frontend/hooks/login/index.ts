import { QUERY_KEY } from 'constants/routes';
import { useMutation, useQuery } from 'react-query';
import { login, verifyAdmin } from 'services/login';

export const useLogin = ({ onSuccess, onError }: any) => {
  return useMutation([QUERY_KEY.LOGIN], (params: { username: string; password: string }) => login(params), {
    onSuccess,
    onError,
  });
};

export const useVerifyAdmin = ({ onSuccess, onError }: any) => {
  return useMutation([QUERY_KEY.VERIFY_ADMIN], verifyAdmin, {
    onSuccess,
    onError,
  });
};
