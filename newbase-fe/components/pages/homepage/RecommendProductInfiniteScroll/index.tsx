import { Col, Row, Image } from "antd";
import { APP_URL } from "constants/common";
import { useGetFlowers } from "hooks/flower";
import Link from "next/link";
import ArrowRight from "public/svg/arrow_right";
import React from "react";
import ImageNext from "next/image";
import PublicImage from "public/images";

function RecommendProduct(props: any) {
  const { data } = props || {};
  const { id: topicIds, name: topicName } = data || {};
  const { data: list } = useGetFlowers({
    params: { limit: 4, page: 1, topicIds },
  });

  return (
    <div className="recommend-product">
      <div className="recommend-product__title centrelize-text">
        {topicName}
      </div>
      <Row className="recommend-product__list">
        {list?.items?.map((item: any) => {
          const { listImage, name, price, id } = item || {};
          console.log(listImage?.length);

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
                  From ${price}
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>
      <div className="recommend-product__group__see-all-topic-btn center-flex-item">
        <Link
          href={{
            pathname: APP_URL.PRODUCT_LIST,
            query: {
              topicIds,
            },
          }}
        >
          See all for {topicName} <ArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default RecommendProduct;
