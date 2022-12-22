import { ReactElement, useMemo, useState } from "react";
import PublicLayout from "components//Layout/Public";
import TagList from "components//TagList";
import AppBreadcrumb from "components//AppBreadCrumb";
import { Col, Form, Input, Modal, Row } from "antd";
import { useGetDetailFlower, useGetFlowers } from "hooks/flower";
import AppCarousel from "components//AppCarousel";
import { useWindowSize } from "hooks/useWindowSize";

function ProductDetail({ id }: any) {
  const { data } = useGetDetailFlower(id);
  const { data: moreItemList } = useGetFlowers({
    params: { limit: 4, page: 1 },
  });
  const { listTopics, flower } = data || {};
  const { listImage, name: flowerName, price } = flower || {};
  const [mainImg, setMainImg] = useState(listImage?.length > 0 && listImage[0]);
  const [openModalSendInquiry, setOpenModalSendInquiry] = useState(false);
  const [form] = Form.useForm();

  const { width } = useWindowSize();
  const smallScreen = width <= 500;

  const renderImageGroup = useMemo(() => {
    return (
      <>
        <div className="product-detail__page-info__main-img">
          <img src={mainImg} alt="" />
        </div>
        <AppCarousel
          list={listImage}
          numberItemPerView={smallScreen ? 3 : 5}
          onChange={setMainImg}
        />
      </>
    );
  }, [mainImg, listImage]);

  return (
    <main className="container product-detail">
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
                  <img src={listImage[0]} alt="" />
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
          onFinish={() => {}}
          onFinishFailed={() => {}}
          autoComplete="off"
        >
          <Form.Item
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
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true }, { type: "number", min: 9 }]}
          >
            <Input placeholder="" />
          </Form.Item>
        </Form>
        <button
          key="submit"
          className="product-detail__send-inquiry-modal__submit-btn"
          onClick={() => setOpenModalSendInquiry(false)}
        >
          Contact Us Now
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
