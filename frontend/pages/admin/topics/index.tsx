import { ReactElement } from 'react';
import Admin from '@components//Layout/Admin';
import { GetServerSideProps } from 'next';
import withServerSideProps from 'hoc/withServerSideProps';

export default function Topics() {
  return <h1 className='page-title'>Quản lý loại hoa</h1>;
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

Topics.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
