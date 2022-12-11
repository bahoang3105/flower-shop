import { createContext, ReactElement, useContext, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import PublicLayout from '@components//Layout/Public';
import withServerSideProps from 'hoc/withServerSideProps';
import AppBreadcrumb from '@components//AppBreadCrumb';
import { Col, Pagination, Row } from 'antd';
import { useGetTopics } from 'hooks/topic';
import SearchGroup, { filterType } from './SearchGroup';
import { getFlowers } from 'services/flower';
import { scrollToElement } from 'utils/helper';
import NoDataImg from 'public/svg/no_data.svg';

type TagItemType = {
  description: string;
  id: number;
  isDeleted: boolean;
  name: string;
};

export const ProductListContext = createContext({});
function ProductList() {
  const [filter, setFilter] = useState<filterType>({
    priceRange: { priceFrom: false, priceTo: false },
    productType: [],
    price: 0,
  });
  const [data, setData] = useState<any>({});
  const [page, setPage] = useState(1);

  const { data: topicList } = useGetTopics({
    params: { limit: 10000000000, page: 1, flowersPerTopic: 0 },
  });

  const fetchProductList = async () => {
    const res = await getFlowers({
      limit: 12,
      page,
      topicIds: filter?.productType,
      // priceFrom: filter?.priceRange?.priceFrom || 0,
      // priceTo: filter?.priceRange?.priceTo || 11,
    });
    setData(res?.data?.data);
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const getProductTypeText = useMemo(() => {
    return topicList?.data?.length > 0
      ? topicList?.data
          ?.filter((topicItem: any) => {
            console.log(topicItem);
            return filter?.productType?.includes(topicItem?.id);
          })
          ?.map((topicItem: any) => {
            return topicItem?.name;
          })
          ?.join(' , ')
      : ' ';
  }, [topicList, filter]);

  const flowerList = useMemo(() => {
    return data?.items?.map((flower: any) => ({ ...flower, key: flower.id, thumbnail: flower.listImage[0] }));
  }, [data]);

  return (
    <ProductListContext.Provider value={{ filter, topicList, setFilter, fetchProductList }}>
      <main className='container product-list'>
        <TagList />
        <div className='product-list__breadcrum'>
          <AppBreadcrumb />
        </div>
        <div className='product-list__page-title'>TRENDING NOW</div>
        <div className='product-list__result-number'>
          Showing <b>{data?.meta?.totalItems}</b> results {getProductTypeText}
        </div>
        <div className='product-list__list-container'>
          <div className='product-list__search-group'>
            <div className='product-list__search-group__content'>
              <SearchGroup />
            </div>
          </div>
          <Row className='product-list__list' id='product-list__list'>
            {flowerList?.length > 0 ? (
              flowerList?.map((itemData: any) => {
                return (
                  <Col key={itemData?.key} xs={24} sm={12} md={12} lg={8} xl={6}>
                    <ProductItem data={itemData} />
                  </Col>
                );
              })
            ) : (
              <div className='product-list__no-data'>
                <img className='product-list__no-data__main-img' src={NoDataImg} alt='' />
              </div>
            )}
            <div className='product-list__pagination'>
              <Pagination onChange={setPage} showSizeChanger={false} pageSize={12} total={data?.meta?.totalItems} />
            </div>
          </Row>
        </div>
      </main>
    </ProductListContext.Provider>
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
  const { setFilter, fetchProductList, topicList } = useContext<any>(ProductListContext);

  const onClick = (productTypeId: string | number) => {
    setFilter((prev: filterType) => ({ ...prev, productType: [productTypeId] }));
    fetchProductList();
    scrollToElement({
      id: 'product-list__list',
      yOffset: -80,
    });
  };

  return (
    <Row justify='center' align='middle' className='tag-list' gutter={16}>
      {topicList?.data?.map((topicItem: TagItemType) => {
        const { name, id } = topicItem || {};
        return (
          <Col onClick={() => onClick(id)} key={id} className='tag-list__item cursor-pointer'>
            {name}
          </Col>
        );
      })}
    </Row>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps(async (context: any) => {
  // Pass data to the page via props
  return { props: context };
});

ProductList.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default ProductList;
