import AdminLayout from 'components//Layout/Admin';
import { WEB_URL } from 'constants/routes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    router.push(WEB_URL.MANAGE_FLOWERS);
  }, []);

  return <AdminLayout> </AdminLayout>;
}
