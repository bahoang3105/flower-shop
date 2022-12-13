import { ReactElement } from 'react';
import PublicLayout from '@components//Layout/Public';
import TagList from '@components//TagList';
import AppBreadcrumb from '@components//AppBreadCrumb';
import { Col, Row } from 'antd';
import { useGetDetailFlower } from 'hooks/flower';

function ProductDetail({ id }: any) {
  const { data } = useGetDetailFlower(id);
  const { listImage } = data?.flower || {};

  console.log('data :>> ', data);
  console.log(listImage);

  return (
    <main className='container product-detail'>
      <TagList onClick={() => {}} />
      <div className='product-detail__breadcrum'>
        <AppBreadcrumb />
      </div>
      <div className='product-detail__page-title'>PRODUCT</div>
      <Row className='product-detail__page-info' gutter={[60, 60]}>
        <Col span={24} lg={14}>
          <div className='product-detail__page-info__main-img'>
            <img src={listImage?.length > 0 && listImage[0]} alt='' />
          </div>
        </Col>
        <Col span={24} lg={10}>
          dfg
        </Col>
      </Row>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const id = context?.query?.id;
  return {
    props: { id }, // will be passed to the page component as props
  };
}

ProductDetail.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default ProductDetail;
