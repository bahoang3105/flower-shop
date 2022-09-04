import { ReactElement } from 'react';
import Admin from '@components//Layout/Admin';
import { GetServerSideProps } from 'next';
import withServerSideProps from 'hoc/withServerSideProps';

export default function Flowers() {
  return <h1 className='page-title'>Quản lý hoa</h1>;
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

Flowers.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
