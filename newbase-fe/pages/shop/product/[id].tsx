import { ReactElement, useEffect, useMemo, useState } from "react";
import PublicLayout from "components//Layout/Public";
import TagList from "components//TagList";
import AppBreadcrumb from "components//AppBreadCrumb";
import { Col, Image, message, Modal, Row } from "antd";
import ImageNext from "next/image";
import { useGetDetailFlower, useGetFlowers } from "hooks/flower";
import AppCarousel from "components//AppCarousel";
import { useWindowSize } from "hooks/useWindowSize";
import PublicImage from "public/images";
import AppImage from "@components//AppImage";
import { postAccountGuests } from "services/accountGuest";
import { useRouter } from "next/router";
import { APP_URL } from "constants/common";
import { formatNumber } from "utils/common";

function ProductDetail({ id }: any) {
  const [messageApi, contextHolder] = message.useMessage();
  const { width } = useWindowSize();
  const router = useRouter();
  const { data } = useGetDetailFlower(id);

  const { data: moreItemList } = useGetFlowers({
    params: {
      limit: 8,
      page: 1,
      topicIds: data?.listTopics?.map(({ id }: any) => id),
    },
  });
  const { listTopics, flower } = data || {};
  const { listImage, name: flowerName, price, size } = flower || {};

  const [mainImg, setMainImg] = useState(listImage?.length > 0 && listImage[0]);
  const [smallScreen, setSmallScreen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validatePhone, setValidatePhone] = useState<any>();
  const [openModalSendInquiry, setOpenModalSendInquiry] = useState(false);

  useEffect(() => {
    setSmallScreen(width <= 500);
  }, []);

  // useEffect(() => {
  //   console.log(listImage)
  //   setMainImg(listImage?.length > 0 && listImage[0]);
  // }, [listImage]);

  const formatedImgList: any = useMemo(() => {
    return listImage?.map((item: any) => {
      return item?.filePath;
    });
  }, [listImage]);

  const renderImageGroup = useMemo(() => {
    return (
      <>
        <div className="bg-wrap">
          <div className="product-detail__page-info__main-img__container">
            <div className="product-detail__page-info__main-img">
              <AppImage
                src={mainImg}
                preview={false}
                alt=""
                className="product-detail__page-info__main-img__image"
              />
            </div>
          </div>
        </div>
        {formatedImgList?.length > 0 && (
          <AppCarousel
            list={formatedImgList}
            numberItemPerView={smallScreen ? 3 : 5}
            onChange={setMainImg}
          />
        )}
      </>
    );
  }, [mainImg, listImage]);

  const onSubmitUserInfo = () => {
    if (phoneNumber?.length < 9) {
      setValidatePhone("Vui lòng nhập số điện thoại tối thiểu 9 số");
    } else {
      postAccountGuests(
        {
          phoneNumber,
          pageLink: router?.asPath,
          pageAccess: flowerName,
          timeAccess: new Date(Date.now()).toISOString(),
        },
        () => {
          messageApi.open({
            type: "success",
            content: "Gửi thông tin thành công , xin cảm ơn quý khách",
          });
        },
        () => {
          messageApi.open({
            type: "error",
            content: "Gửi thông tin thất bại , xin vui lòng thử lại",
          });
        }
      );
      setOpenModalSendInquiry(false);
      setValidatePhone(false);
    }
  };

  const formatMoreItemList = useMemo(() => {
    return moreItemList?.items?.filter((item: any) => {
      return parseInt(id) !== item?.id;
    }).slice(0, 4);
  }, [moreItemList, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidatePhone(false);
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      setPhoneNumber(inputValue);
    }
  };

  return (
    <main className="container product-detail">
      {contextHolder}
      {/* <TagList onClick={() => {}} /> */}
      <div className="product-detail__breadcrum">
        <AppBreadcrumb />
      </div>
      <div className="product-detail__page-title">PRODUCT</div>
      <Row className="product-detail__page-info" gutter={[60, 60]}>
        <Col span={24} lg={14}>
          {renderImageGroup}
          <Row className="product-detail__topic-list" gutter={[16, 16]}>
            {listTopics?.map(({ name }: { name: string }) => {
              return (
                <Col className="product-detail__topic-list__item">{name}</Col>
              );
            })}
          </Row>
        </Col>
        <Col span={24} lg={10}>
          <p className="product-detail__product-name">{flowerName}</p>
          <p className="product-detail__product-price">
            Giá : {parseInt(price, 10).toLocaleString()} VND
          </p>
          <div className="product-detail__product-size">
            <div className="product-detail__product-size__label">Size</div>
            <div className="product-detail__product-size__size">{size}</div>
          </div>
          <div className="product-detail__desc-group">
            <div className="product-detail__desc-group__title">
              <p>Thông tin sản phẩm</p>
            </div>
            <div className="product-detail__desc-group__content">
              {flower?.description}
            </div>
          </div>
          <button
            className="product-detail__send-inquiry-btn"
            onClick={() => setOpenModalSendInquiry(true)}
          >
            Mua Hoa
          </button>
        </Col>
      </Row>
      <div className="product-detail__more-item">
        <p className="product-detail__more-item__title">
          Các sản phẩm hoa khác
        </p>
        <Row gutter={[16, 16]} wrap>
          {formatMoreItemList?.map(
            ({ listImage, name, price, id: recommendId }: any) => {
              return (
                <Col
                  onClick={() => {
                    router.push({
                      pathname: APP_URL.PRODUCT_DETAIL,
                      query: { id: recommendId },
                    });
                  }}
                  span={24}
                  sm={12}
                  lg={6}
                >
                  <div style={{ cursor: 'pointer' }}>
                    <div className="product-detail__more-item__item">
                      {listImage?.length > 0 ? (
                        <Image
                        src={listImage[0]?.filePath}
                        preview={false}
                        alt=""
                        />
                        ) : (
                          <ImageNext
                          className="product-detail__more-item__item__blank-img"
                          src={PublicImage?.blankImg}
                          alt=""
                          />
                          )}
                    </div>
                    <p className="product-detail__more-item__item-name">{name}</p>
                    <p className="product-detail__more-item__item-price">
                      {formatNumber(price)} VND
                    </p>
                  </div>
                </Col>
              );
            }
          )}
        </Row>
      </div>
      <Modal
        open={openModalSendInquiry}
        onOk={() => setOpenModalSendInquiry(false)}
        onCancel={() => setOpenModalSendInquiry(false)}
        className="product-detail__send-inquiry-modal"
        footer={null}
        width={400}
      >
        <div className="product-detail__send-inquiry-modal__title">
          Gửi yêu cầu
        </div>
        <p className="product-detail__send-inquiry-modal__desc">
          Chỉ cần để lại liên lạc của bạn dưới đây. Chúng tôi sẽ liên lạc với
          bạn ngay!
        </p>
        <p className="product-detail__send-inquiry-modal__input-label">
          Số điện thoại của bạn
          <span className="product-detail__send-inquiry-modal__input-label__asterisk">
            *
          </span>
        </p>
        <input
          className="product-detail__send-inquiry-modal__input-phone"
          name="phone"
          value={phoneNumber}
          onChange={handleChange}
          maxLength={11}
        />
        <div className="product-detail__send-inquiry-modal__input-phone__char-count">
          {phoneNumber?.length || 0}/11
        </div>

        <div className="product-detail__send-inquiry-modal__input-phone__validate-phone">
          {validatePhone}
        </div>
        <button
          onClick={() => {
            onSubmitUserInfo();
          }}
          className="product-detail__send-inquiry-modal__submit-btn"
        >
          Gửi yêu càu
        </button>
      </Modal>
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
