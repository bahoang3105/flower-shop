import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import "antd/dist/reset.css";
import "../styles/_app.scss";
import { ReactElement, ReactNode, useEffect } from "react";
import { getToken } from "services/api";

import HTTP_STATUS_CONSTANTS from "constants/httpStatus";
import showMessage from "components//Message";
import { LOCAL_STORAGE, TYPE_MESSAGE } from "constants/common";
import { useRouter } from "next/router";
import { WEB_URL } from "constants/routes";
import AppAuthWrapper from "components//AppAuthWrapper";
import { NextPage } from "next";
import { TOP_ANCHOR } from "utils/helper";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
    if (token) {
      getToken(token);
    }
  }, []);

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

  return (
    <QueryClientProvider client={queryClient}>
      <div id={TOP_ANCHOR}></div>
      <AppAuthWrapper>{getLayout(<Component {...pageProps} />)}</AppAuthWrapper>
    </QueryClientProvider>
  );
}
