import { ReactElement } from 'react';
import { Image } from 'antd';
import { GetServerSideProps } from 'next';
import PublicLayout from '@components//Layout/Public';
import withServerSideProps from 'hoc/withServerSideProps';
import PublicImage from 'public/images';
import FollewCollection from '@components//pages/homepage/collection';

function Home() {
  return (
    <main className='homepage'>
      <div className='homepage__thumbnail'>
        <Image src={PublicImage.banner} preview={false} />
      </div>
      <FollewCollection />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

Home.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Home;
