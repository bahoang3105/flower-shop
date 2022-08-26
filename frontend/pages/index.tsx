import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import PublicLayout from '@components//Layout/Public';
import withServerSideProps from 'hoc/withServerSideProps';

function Home() {
  return <div style={{ height: '50vh' }}>asdkfa</div>;
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

Home.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Home;
