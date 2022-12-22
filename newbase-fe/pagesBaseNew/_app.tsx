import { QueryClient, QueryClientProvider } from "react-query";

import "antd/dist/reset.css";
import "../styles/_app.scss";
import { useEffect } from "react";
import { getToken } from "services/api";
import HTTP_STATUS_CONSTANTS from "constants/httpStatus";
import showMessage from "components//Message";
import { LOCAL_STORAGE, TYPE_MESSAGE } from "constants/common";
import { useRouter } from "next/router";
import { WEB_URL } from "constants/routes";
import AppAuthWrapper from "components//AppAuthWrapper";

const onBeforeLift = (store: any) => () => {};

const MyApp = ({ Component, pageProps }: any) => {
  const router = useRouter();
  const isClient = typeof window !== "undefined";
  const getLayout = Component.getLayout ?? ((page: any) => page);
  const handleError = (error: any) => {
    console.log(error);
    if (error?.response?.status === HTTP_STATUS_CONSTANTS.UNAUTHORIZED) {
      showMessage(TYPE_MESSAGE.ERROR, "Unauthorized");
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
        <AppAuthWrapper>
          {getLayout(<Component {...pageProps} />)}
        </AppAuthWrapper>
      ) : (
        <AppAuthWrapper>
          <Component {...pageProps} />
        </AppAuthWrapper>
      )}
    </QueryClientProvider>
  );
};

export default MyApp;
