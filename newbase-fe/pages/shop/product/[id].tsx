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

function ProductDetail({ id }: any) {
  const [messageApi, contextHolder] = message.useMessage();
  const { width } = useWindowSize();
  const router = useRouter();
  const { data } = useGetDetailFlower(id);
  const { data: moreItemList } = useGetFlowers({
    params: { limit: 4, page: 1 },
  });
  const { listTopics, flower } = data || {};
  const { listImage, name: flowerName, price } = flower || {};
  const [mainImg, setMainImg] = useState(listImage?.length > 0 && listImage[0]);
  const [smallScreen, setSmallScreen] = useState(false);
  const [openModalSendInquiry, setOpenModalSendInquiry] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setSmallScreen(width <= 500);
  }, []);

  const formatedImgList: any = useMemo(() => {
    listImage?.map(({ filePath }: any) => filePath);
  }, [listImage]);

  const renderImageGroup = useMemo(() => {
    return (
      <>
        <div className="product-detail__page-info__main-img">
          <AppImage
            src={mainImg}
            preview={false}
            alt=""
            className="product-detail__page-info__main-img__image"
          />
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
        pageTitle: flowerName,
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
          <p className="product-detail__product-price">${price}</p>{" "}
          <div className="product-detail__desc-group">
            <div className="product-detail__desc-group__title">
              <p>Description</p>
            </div>
            <div className="product-detail__desc-group__content">
              {flower?.description}
            </div>
          </div>
          <button
            className="product-detail__send-inquiry-btn"
            onClick={() => setOpenModalSendInquiry(true)}
          >
            Send Inquiry
          </button>
        </Col>
      </Row>
      <div className="product-detail__more-item">
        <p className="product-detail__more-item__title">
          MORE ITEMS TO CONSIDER
        </p>
        <Row gutter={[16, 16]} wrap>
          {moreItemList?.items?.map(({ listImage, name, price }: any) => {
            return (
              <Col span={24} sm={12} lg={6}>
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
          })}
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
          Send an Inquiry
        </div>
        <p className="product-detail__send-inquiry-modal__desc">
          Just leave your contact below. We will get in touch with you shortly!
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
            label="Phone Number"
            rules={[{ required: true }, { type: "string", min: 9 }]}
          >
            <Input placeholder="" />
          </Form.Item>
          <button
            key="submit"
            className="product-detail__send-inquiry-modal__submit-btn"
          >
            Contact Us Now
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
