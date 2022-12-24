import {
  createContext,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import PublicLayout from "components//Layout/Public";
import AppBreadcrumb from "components//AppBreadCrumb";
import { Col, Pagination, Image, Row } from "antd";
import ImageNext from "next/image";
import { useGetTopics } from "hooks/topic";
import SearchGroup, { filterType } from "./SearchGroup";
import { getFlowers } from "services/flower";
import { scrollToElement } from "utils/helper";
import NoDataImg from "public/svg/no_data.svg";
import TagList from "components//TagList";
import Link from "next/link";
import { APP_URL } from "constants/common";
import PublicImage from "public/images";
import { formatNumber } from "utils/common";

export const ProductListContext = createContext({});

function ProductList({ topicIds, keyword }: any) {
  const [filter, setFilter] = useState<filterType>({
    keyword: "",
    priceRange: { priceFrom: false, priceTo: false },
    productType: [],
    price: 0,
  });
  const [data, setData] = useState<any>({});
  const [page, setPage] = useState(1);

  const { data: topicList } = useGetTopics({
    params: { limit: 10000000000, page: 1, flowersPerTopic: 0 },
  });
  const fetchProductList = async (filterProps: { topicIds?: any }) => {
    const { topicIds } = filterProps || {};
    const formatedTopicIdList = filter?.productType?.filter((item: any) => {
      return item;
    });

    const res = await getFlowers({
      limit: 12,
      page,
      topicIds:
        formatedTopicIdList?.length > 0 ? formatedTopicIdList : topicIds,
      keyword: filter?.keyword || keyword,
      // priceFrom: filter?.priceRange?.priceFrom || 0,
      // priceTo: filter?.priceRange?.priceTo || 11,
    });
    setData(res?.data?.data);
  };

  useEffect(() => {
    setFilter((prev: any) => {
      console.log(topicIds);
      const newProductType = [...prev?.productType, parseInt(topicIds, 10)];
      fetchProductList({ topicIds: topicIds && newProductType });
      return {
        ...prev,
        productType: newProductType,
      };
    });
  }, []);

  const getProductTypeText = useMemo(() => {
    return (
      topicList?.data?.items?.length > 0 &&
      topicList?.data?.items
        ?.filter((topicItem: any) => {
          return filter?.productType?.includes(topicItem?.id);
        })
        ?.map((topicItem: any) => {
          return topicItem?.name;
        })
        ?.join(" , ")
    );
  }, [topicList, data]);

  const flowerList = useMemo(() => {
    return data?.items?.map((flower: any) => ({
      ...flower,
      key: flower.id,
      thumbnail: flower.listImage[0]?.filePath,
    }));
  }, [data]);

  const onClickTagItem = (productTypeId: number) => {
    setFilter((prev: filterType) => ({
      ...prev,
      productType: [productTypeId],
    }));
    fetchProductList({ topicIds: [productTypeId] });
    scrollToElement({
      id: "product-list__list",
      yOffset: -80,
    });
  };

  return (
    <ProductListContext.Provider
      value={{ filter, topicList, setFilter, fetchProductList }}
    >
      <main className="container product-list">
        <TagList onClick={onClickTagItem} />
        <div className="product-list__breadcrum">
          <AppBreadcrumb />
        </div>
        <div className="product-list__page-title">Phân Loại</div>
        <div className="product-list__result-number">
          Hiển thị <b>{data?.meta?.totalItems}</b> kết quả{" "}
          {getProductTypeText && `cho "${getProductTypeText}"`}
        </div>
        <div className="product-list__list-container">
          <div className="product-list__search-group">
            <div className="product-list__search-group__content">
              <SearchGroup defaultValueInput={keyword} />
            </div>
          </div>
          <Row className="product-list__list" id="product-list__list">
            {flowerList?.length > 0 ? (
              flowerList?.map((itemData: any) => {
                return (
                  <Col
                    key={itemData?.key}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={8}
                    xl={6}
                  >
                    <ProductItem data={itemData} />
                  </Col>
                );
              })
            ) : (
              <div className="product-list__no-data">
                <ImageNext
                  className="product-list__no-data__main-img"
                  src={NoDataImg}
                  alt=""
                />
              </div>
            )}
            <div className="product-list__pagination">
              <Pagination
                onChange={setPage}
                showSizeChanger={false}
                pageSize={12}
                total={data?.meta?.totalItems}
              />
            </div>
          </Row>
        </div>
      </main>
    </ProductListContext.Provider>
  );
}

function ProductItem({
  data,
}: {
  data: {
    name: string;
    price: number;
    listImage: { filePath: string }[];
    id: string | number;
  };
}) {
  const { name, listImage, price, id } = data || {};
  console.log(data);

  return (
    <Link
      href={{
        pathname: APP_URL.PRODUCT_DETAIL,
        query: { id },
      }}
    >
      <div className="product-list__list__item">
        <div className="product-list__list__item__thumbnail">
          {listImage?.length > 0 ? (
            <Image
              className="product-list__list__item__thumbnail__main-img"
              preview={false}
              src={listImage[0].filePath || ""}
              alt={name || ""}
            />
          ) : (
            <ImageNext
              className="product-list__list__item__thumbnail__main-img"
              src={PublicImage?.blankImg}
              alt={name || ""}
            />
          )}
        </div>
        <div className="product-list__list__item__info">
          <p className="product-list__list__item__info__name">
            <b>{name}</b>
          </p>
          <p className="product-list__list__item__info__price">
            {formatNumber(price)} VND
          </p>
        </div>
      </div>
    </Link>
  );
}

export async function getServerSideProps(context: any) {
  const { topicIds, keyword } = context?.query || {};
  return {
    props: { topicIds: topicIds || null, keyword: keyword || null }, // will be passed to the page component as props
  };
}
ProductList.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default ProductList;
