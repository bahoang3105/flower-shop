import { Col, Row, Image } from "antd";
import { APP_URL } from "constants/common";
import { useGetFlowers } from "hooks/flower";
import Link from "next/link";
import ArrowRight from "public/svg/arrow_right";
import React, { useEffect, useMemo, useState } from "react";
import ImageNext from "next/image";
import PublicImage from "public/images";
import { formatNumber } from "utils/common";
import { useWindowSize } from "hooks/useWindowSize";

function RecommendProduct(props: any) {
  const { data, handleEmptyList } = props || {};
  // const { width } = useWindowSize();
  const { id: topicIds, name: topicName } = data || {};
  const [limit, setLimit] = useState(4);
  const { data: list } = useGetFlowers({
    params: { limit, page: 1, topicIds },
  });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!list?.items?.length && list?.meta) {
      handleEmptyList();
      setHidden(true);
    }
  }, [list]);

  // const dataRender = useMemo(() => {
  //   if (width < 1200 && width > 991) {
  //     return list?.items?.slice(0, 4);
  //   }
  //   return list?.items;
  // }, [list, width < 1200 && width > 991]);

  return (
    <>
      {!hidden && (
        <div className="recommend-product">
          <div className="recommend-product__title centrelize-text">
            {topicName}
          </div>
          <Row className="recommend-product__list">
            {list?.items?.map((item: any) => {
              const { listImage, name, price, id } = item || {};
              return (
                <Col
                  className="recommend-product__list__item"
                  xs={24}
                  sm={12}
                  md={12}
                  xl={6}
                >
                  <Link
                    href={{
                      pathname: APP_URL.PRODUCT_DETAIL,
                      query: { id },
                    }}
                  >
                    <div className="recommend-product__list__item__thumbnail-img">
                      {listImage?.length > 0 ? (
                        <Image
                          className="image"
                          src={listImage[0]?.filePath}
                          preview={false}
                          alt=""
                        />
                      ) : (
                        <ImageNext
                          className="image"
                          src={PublicImage?.blankImg}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="recommend-product__list__item__name centrelize-text">
                      {name}
                    </div>
                    <div className="recommend-product__list__item__price centrelize-text">
                      {formatNumber(price)} VND
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
          {/* <div
            onClick={() => {
              setLimit((prev) => prev + 4);
            }}
            className="recommend-product__group__see-all-topic-btn center-flex-item"
          >
            Xem thêm với {topicName} <ArrowRight />
          </div> */}
          <div className="recommend-product__group__see-all-topic-btn center-flex-item">
            <Link
              href={{
                pathname: APP_URL.PRODUCT_LIST,
                query: {
                  topicIds,
                },
              }}
            >
              Xem tất cả {topicName} <ArrowRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default RecommendProduct;
