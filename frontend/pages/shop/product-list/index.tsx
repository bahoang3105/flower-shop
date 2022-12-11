import { ReactElement, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import PublicLayout from '@components//Layout/Public';
import withServerSideProps from 'hoc/withServerSideProps';
import AppBreadcrumb from '@components//AppBreadCrumb';
import { Col, Pagination, Row } from 'antd';
import { useGetTopics } from 'hooks/topic';
import { useGetFlowers } from 'hooks/flower';
import SearchGroup, { filterType } from './SearchGroup';

type TagItemType = {
  description: string;
  id: number;
  isDeleted: boolean;
  name: string;
};

function ProductList() {
  const [filter, setFilter] = useState<filterType>({
    priceRange: { priceFrom: false, priceTo: false },
    productType: [],
    price: 0,
  });
  const [page, setPage] = useState(1);
  const { data } = useGetFlowers({
    params: {
      limit: 12,
      page,
      topicIds: filter?.productType,
      // priceFrom: filter?.priceRange?.priceFrom || 0,
      // priceTo: filter?.priceRange?.priceTo || 11,
    },
  });

  const flowerList = useMemo(() => {
    return data?.items?.map((flower: any) => ({ ...flower, key: flower.id, thumbnail: flower.listImage[0] }));
  }, [data]);

  return (
    <main className='container product-list'>
      <TagList />
      <div className='product-list__breadcrum'>
        <AppBreadcrumb />
      </div>
      <div className='product-list__page-title'>TRENDING NOW</div>
      <div className='product-list__result-number'>
        Showing <b>1070</b> results for "Happy Father Day"
      </div>
      <div className='product-list__list-container'>
        <div className='product-list__search-group'>
          <div className='product-list__search-group__content'>
            <SearchGroup
              onSubmitFilter={(data: filterType) => {
                setFilter(data);
              }}
            />
          </div>
        </div>
        <Row className='product-list__list'>
          {flowerList?.map((itemData: any) => {
            return (
              <Col key={itemData?.key} xs={24} sm={12} md={12} lg={8} xl={6}>
                <ProductItem data={itemData} />
              </Col>
            );
          })}
          <div className='product-list__pagination'>
            <Pagination onChange={setPage} showSizeChanger={false} pageSize={12} total={data?.meta?.totalItems} />
          </div>
        </Row>
      </div>
    </main>
  );
}

function ProductItem({ data }: { data: { name: string; price: number; thumbnail: string } }) {
  const { name, thumbnail, price } = data || {};
  return (
    <div className='product-list__list__item'>
      <div className='product-list__list__item__thumbnail'>
        <img className='product-list__list__item__thumbnail__main-img' src={thumbnail} alt={name || ''} />
      </div>
      <div className='product-list__list__item__info'>
        <p className='product-list__list__item__info__name'>
          <b>{name}</b>
        </p>
        <p className='product-list__list__item__info__price'>From ${price}</p>
      </div>
    </div>
  );
}

function TagList() {
  const { data: topicList } = useGetTopics({
    params: { limit: 10000000000, page: 1, flowersPerTopic: 0 },
  });

  return (
    <Row justify='center' align='middle' className='tag-list' gutter={16}>
      {topicList?.data?.map((topicItem: TagItemType) => {
        const { name } = topicItem || {};
        return <Col className='tag-list__item'>{name}</Col>;
      })}
    </Row>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

ProductList.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default ProductList;
