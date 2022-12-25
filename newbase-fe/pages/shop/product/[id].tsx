import { ReactElement, useEffect, useMemo, useState } from "react";
import PublicLayout from "components//Layout/Public";
import TagList from "components//TagList";
import AppBreadcrumb from "components//AppBreadCrumb";
import { Col, Form, Image, Input, message, Modal, Row } from "antd";
import ImageNext from "next/image";
import { useGetDetailFlower, useGetFlowers } from "hooks/flower";
import AppCarousel from "components//AppCarousel";
import { useWindowSize } from "hooks/useWindowSize";
import PublicImage from "public/images";
import AppImage from "@components//AppImage";
import { postAccountGuests } from "services/accountGuest";
import { useRouter } from "next/router";
import { APP_URL } from "constants/common";

function ProductDetail({ id }: any) {
  const [messageApi, contextHolder] = message.useMessage();
  const { width } = useWindowSize();
  const router = useRouter();
  const { data } = useGetDetailFlower(id);

  const { data: moreItemList } = useGetFlowers({
    params: {
      limit: 4,
      page: 1,
      topicIds: data?.listTopics?.map(({ id }: any) => id),
    },
  });
  const { listTopics, flower } = data || {};
  const { listImage, name: flowerName, price, size } = flower || {};

  const [mainImg, setMainImg] = useState(listImage?.length > 0 && listImage[0]);
  const [smallScreen, setSmallScreen] = useState(false);
  const [openModalSendInquiry, setOpenModalSendInquiry] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setSmallScreen(width <= 500);
  }, []);

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

  const onSubmitUserInfo = (values: any) => {
    postAccountGuests(
      {
        phoneNumber: values?.phone,
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
  };

  const formatMoreItemList = useMemo(() => {
    return moreItemList?.items?.filter((item: any) => {
      return parseInt(id) !== item?.id;
    });
  }, [moreItemList, id]);

  return (
    <main className="container product-detail">
      {contextHolder}
      <TagList onClick={() => {}} />
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
                    From ${price}
                  </p>
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
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmitUserInfo}
          // onFinishFailed={() => {}}
          autoComplete="off"
        >
          {/* <Form.Item
            name="name"
            label="Your name"
            rules={[{ required: true }, { type: "string", min: 6 }]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            name="mail"
            label="Email address"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input placeholder="" />
          </Form.Item> */}
          <Form.Item
            name="phone"
            label="Số điện thoại của bạn"
            rules={[
              { required: true },
              {
                type: "string",
                min: 9,
                message: "Vui lòng nhập tối thiểu 9 số",
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
          <button
            key="submit"
            className="product-detail__send-inquiry-modal__submit-btn"
          >
            Gửi yêu càu
          </button>
        </Form>
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
