import { ReactElement, useEffect, useState } from "react";
import Admin from "components//Layout/Admin";
import TextInputWithLabel from "components//AppInput/TextInputWithLabel";
import { useGetWebInfo, useUpdateWebInfo } from "hooks/webInfo";
import { Col, Row } from "antd";
import AppButton from "components//AppButton";
import showMessage from "components//Message";
import { TYPE_MESSAGE } from "constants/common";

export default function WebInfo() {
  const { data: webInfo, refetch } = useGetWebInfo();
  const [title, setTitle] = useState("");
  const [zaloLink, setZaloLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const handleSuccess = () => {
    showMessage(TYPE_MESSAGE.SUCCESS, "Cập nhật thành công");
    refetch();
    setIsEdit(false);
  };
  const { mutateAsync } = useUpdateWebInfo({ onSuccess: handleSuccess });
  const setStateFromApi = () => {
    const { title, email, facebookLink, mobilePhone, zaloLink, address } =
      webInfo?.data || {};
    setTitle(title || "");
    setEmail(email || "");
    setFacebookLink(facebookLink || "");
    setZaloLink(zaloLink || "");
    setAddress(address || "");
    setPhoneNumber(mobilePhone || "");
  };
  const handleClickCancel = () => {
    setIsEdit(false);
    setStateFromApi();
  };
  const handleClickSave = async () => {
    await mutateAsync({
      params: {
        title,
        zaloLink,
        facebookLink,
        email,
        address,
        mobilePhone: phoneNumber,
      },
      id: webInfo?.data?.id,
    });
  };

  useEffect(() => {
    setStateFromApi();
  }, [webInfo]);

  return (
    <div className="web-info">
      <h1 className="page-title">Quản lý thông tin web</h1>
      <div className="web-info__form">
        <TextInputWithLabel
          label="Tiêu đề"
          value={title}
          onChange={setTitle}
          disabled={!isEdit}
        />
        <TextInputWithLabel
          label="Link Zalo"
          value={zaloLink}
          onChange={setZaloLink}
          disabled={!isEdit}
        />
        <TextInputWithLabel
          label="Link Facebook"
          value={facebookLink}
          onChange={setFacebookLink}
          disabled={!isEdit}
        />
        <TextInputWithLabel
          label="Số điện thoại"
          value={phoneNumber}
          onChange={setPhoneNumber}
          disabled={!isEdit}
        />
        <TextInputWithLabel
          label="Địa chỉ"
          value={address}
          onChange={setAddress}
          disabled={!isEdit}
        />
        <TextInputWithLabel
          label="Email"
          value={email}
          onChange={setEmail}
          disabled={!isEdit}
        />
      </div>
      <Row gutter={12}>
        {!isEdit ? (
          <Col>
            <AppButton
              className="web-info__button"
              text="Cập nhật"
              variant="primary"
              onClick={() => setIsEdit(true)}
            />
          </Col>
        ) : (
          <>
            <Col>
              <AppButton
                className="web-info__button"
                text="Hủy"
                onClick={handleClickCancel}
              />
            </Col>
            <Col>
              <AppButton
                className="web-info__button"
                text="Lưu"
                variant="primary"
                onClick={handleClickSave}
              />
            </Col>
          </>
        )}
      </Row>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
WebInfo.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
