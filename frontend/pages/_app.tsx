import { QueryClient, QueryClientProvider } from 'react-query';
import { appWithTranslation } from 'next-i18next';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper } from 'redux/configStore';

import 'antd/dist/antd.css';
import '../styles/_app.scss';
import { useEffect } from 'react';
import { getToken } from 'services/api';
import HTTP_STATUS_CONSTANTS from 'constants/httpStatus';
import showMessage from '@components//Message';
import { LOCAL_STORAGE, TYPE_MESSAGE } from 'constants/common';
import { useRouter } from 'next/router';
import { WEB_URL } from 'constants/routes';

const onBeforeLift = (store: any) => () => {};

const MyApp = ({ Component, pageProps }: any) => {
  const store = useStore();
  const router = useRouter();
  const isClient = typeof window !== 'undefined';
  const getLayout = Component.getLayout ?? ((page: any) => page);
  const handleError = (error: any) => {
    if (error?.response?.status === HTTP_STATUS_CONSTANTS.UNAUTHORIZED) {
      showMessage(TYPE_MESSAGE.ERROR, 'Unauthorized');
      localStorage.removeItem(LOCAL_STORAGE.TOKEN);
      router.push(WEB_URL.ADMIN_LOGIN);
    }
  };
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        keepPreviousData: true,
        retry: false,
        refetchOnWindowFocus: false,
        onError: handleError,
      },
      mutations: {
        onError: handleError,
      },
    },
  });

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
    if (token) {
      getToken(token);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isClient ? (
        <PersistGate persistor={(store as any).__persistor} loading={null} onBeforeLift={onBeforeLift(store)}>
          {getLayout(<Component {...pageProps} />)}
        </PersistGate>
      ) : (
        <Component {...pageProps} />
      )}
    </QueryClientProvider>
  );
};

export default wrapper.withRedux(appWithTranslation(MyApp));
