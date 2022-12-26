import { Col, Row, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import PublicImage from "public/images";
import { COLLECTION_SECTION_ANCHOR } from "@components//AppHeader";
import { APP_URL } from 'constants/common';
import { useRouter } from "next/router";
import { useWindowSize } from "hooks/useWindowSize";

const BTN_BUYNOW_TYPE_CLASSNAME = {
  [2]: "btn-buynow-type-2",
  [3]: "btn-buynow-type-3",
  [4]: "btn-buynow-type-4",
};

type BtnBuyNowType = 2 | 3 | 4;

export default function FlowerCollection() {
  const router = useRouter();
  const { width } = useWindowSize();

  const renderCommonCollectionItem = (
    imageSrc: string,
    importClass: string
  ) => (
    <div className="flower-collection__common-item">
      <Image
        className="flower-collection__common-item__image-group"
        src={imageSrc}
        alt=""
      />
      <Tooltip placement="top" title="Mặt hàng chưa cập nhật">
        <div className={`flower-collection__common-item__button-buy-now ${importClass}`} style={{ cursor: "not-allowed" }}>
          Mua Ngay
        </div>
        </Tooltip>
    </div>
  );
  const handleClickBanner = (topicIds: number) => {
    if (width <= 768) {
      router.push(`${APP_URL.PRODUCT_LIST}?topicIds=${topicIds}`);
    }
  }

  return (
    <>
      <Row
        id={COLLECTION_SECTION_ANCHOR}
        wrap
        className="flower-collection"
        gutter={[16, 16]}
      >
        <Col span={24} lg={12}>
          <div className="flower-collection__first-item">
            <div className="flower-collection__first-item__content">
              <div className="flower-collection__first-item__content__image-group">
                <div className="flower-collection__first-item__content__collection-group center-flex-item">
                  <div>BỘ SƯU TẬP</div>
                </div>
                <Image onClick={() => handleClickBanner(1)} src={PublicImage.banner1} alt="" />
                <Link href={`${APP_URL.PRODUCT_LIST}?topicIds=1`}>
                  <div className="flower-collection__first-item__content__image-group__button-buy-now">
                    Mua Ngay
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Col>
        {[PublicImage.banner2, PublicImage.banner3, PublicImage.banner4]?.map(
          (src, index) => {
            return (
              <Col key={index} span={24} lg={12}>
                {renderCommonCollectionItem(
                  src,
                  BTN_BUYNOW_TYPE_CLASSNAME[(index + 2) as BtnBuyNowType]
                )}
              </Col>
            );
          }
        )}
      </Row>
    </>
  );
}
