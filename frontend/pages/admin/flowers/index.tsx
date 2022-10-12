import { ReactElement, useState } from 'react';
import { GetServerSideProps } from 'next';
import Admin from '@components//Layout/Admin';
import AppButton from '@components//AppButton';
import { PAGE_SIZE } from '@components//Pagination';
import FlowerForm from '@components//Form/FlowerForm';
import withServerSideProps from 'hoc/withServerSideProps';
import { WEB_URL } from 'constants/routes';

export default function Flowers() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE[0]);
  const [params, setParams] = useState<any>();

  return (
    <div>
      <h1 className='page-title'>Quản lý hoa</h1>
      <FlowerForm setParams={setParams} />
      <AppButton text='Thêm mới hoa' variant='primary' href={WEB_URL.CREATE_FLOWER} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

Flowers.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
