import { LOCAL_STORAGE } from 'constants/common';
import { WEB_URL } from 'constants/routes';
import { useVerifyAdmin } from 'hooks/login';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

type PropsType = { children: ReactNode };

export default function AppAuthWrapper({ children }: PropsType) {
  const router = useRouter();
  const handleError = () => {
    localStorage.removeItem(LOCAL_STORAGE.TOKEN);
    router.push(WEB_URL.ADMIN_LOGIN);
  };
  const handleSuccess = () => {
    const isAdminLoginRoute = router.pathname === WEB_URL.ADMIN_LOGIN;
    if (isAdminLoginRoute) {
      router.push(WEB_URL.MANAGE_FLOWERS);
    }
  };
  const { mutate: verifyAdmin } = useVerifyAdmin({ onError: handleError, onSuccess: handleSuccess });

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
    const isAdminLoginRoute = router.pathname === WEB_URL.ADMIN_LOGIN;
    const isAdminRoute = router.pathname.startsWith(WEB_URL.ADMIN) && !isAdminLoginRoute;
    if (token) {
      verifyAdmin();
    }
    if (!token && isAdminRoute) {
      router.push(WEB_URL.ADMIN_LOGIN);
    }
  }, []);

  return <>{children}</>;
}
