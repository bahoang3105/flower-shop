import { LOCAL_STORAGE } from 'constants/common';
import { WEB_URL } from 'constants/routes';
import { useVerifyAdmin } from 'hooks/login';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useMemo } from 'react';
import { scrollToTop } from 'utils/helper';

type PropsType = { children: ReactNode };

export default function AppAuthWrapper({ children }: PropsType) {
  const router = useRouter();
  const isAdminLoginRoute = useMemo(() => router.pathname === WEB_URL.ADMIN_LOGIN, [router]);
  const isAdminRoute = useMemo(() => router.pathname.startsWith(WEB_URL.ADMIN) && !isAdminLoginRoute, [router]);
  const handleError = () => {
    localStorage.removeItem(LOCAL_STORAGE.TOKEN);
    router.push(WEB_URL.ADMIN_LOGIN);
  };
  const handleSuccess = () => {
    if (isAdminLoginRoute) {
      router.push(WEB_URL.MANAGE_FLOWERS);
    }
  };
  const { mutate: verifyAdmin } = useVerifyAdmin({ onError: handleError, onSuccess: handleSuccess });

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
    if (token && isAdminRoute) {
      verifyAdmin();
    }
    if (!token && isAdminRoute) {
      router.push(WEB_URL.ADMIN_LOGIN);
    }
    scrollToTop();
  }, [router]);

  return <>{children}</>;
}
