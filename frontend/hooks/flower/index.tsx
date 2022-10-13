import { QUERY_KEY } from 'constants/routes';
import { useMutation } from 'react-query';
import { createFlower } from 'services/flower';

export const useCreateFlower = ({ onSuccess }: any) => {
  return useMutation([QUERY_KEY.CREATE_FLOWER], (formData: FormData) => createFlower(formData), {
    onSuccess,
  });
};
