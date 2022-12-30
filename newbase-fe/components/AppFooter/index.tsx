import { Col, Row } from "antd";
import { useGetWebInfo } from "hooks/webInfo";
import Image from "next/image";
import PublicImage from "public/images";
import ImageSvg from "public/svg";
import { CONTACT_SECTION_ANCHOR } from "../AppHeader";

export default function Footer() {
  const { data: webInfo } = useGetWebInfo();
  const { address, email, facebookLink, mobilePhone, zaloLink } =
    webInfo?.data || {};
  const messengerLink =
    "http://m.me/" +
    facebookLink?.split("/")[facebookLink?.split("/").length - 1];

  const SOCIAL_LIST = [
    { key: 1, srcImage: PublicImage.facebook, url: facebookLink },
    { key: 2, srcImage: PublicImage.messenger, url: messengerLink },
    { key: 3, srcImage: PublicImage.zalo, url: zaloLink },
    { key: 5, srcImage: PublicImage.mail, url: `mailto:${email}` },
    { key: 4, srcImage: PublicImage.phone, url: `tel:${mobilePhone}` },
  ];

  const renderSocialList = () => {
    return SOCIAL_LIST.map((item) => {
      return (
        <div key={item.key} className="footer-social-list__item">
          <a
            className="footer-social-list__item__link-wrap"
            href={item.url}
            target={item.key === 4 || item.key === 5 ? "_self" : "_blank"}
          >
            <Image
              className="footer-social-list__item__icon-img"
              src={item.srcImage}
              alt=""
              height={36}
              width={36}
            />
            {/* <div className="footer-social-list__item__item-1">{item.url}</div> */}
          </a>
        </div>
      );
    });
  };

  return (
    <>
      <footer id={CONTACT_SECTION_ANCHOR} className="footer-container">
        <Row
          wrap
          gutter={[60, 16]}
          justify="space-between"
          className="footer-content"
        >
          <Col lg={24} xl={5}>
            <Image
              className="footer-content__logo"
              src={ImageSvg.logo}
              alt=""
            />
          </Col>
          <Col lg={24} xl={5}>
            <div className="footer-content__address__content">
              {renderSocialList()}
            </div>
          </Col>
          <Col lg={24} className="footer-content__address" xl={6}>
            <div className="footer-content__address__content">
              <div>
                <b>Địa chỉ : </b>
                {address}
              </div>
            </div>
          </Col>
          <Col lg={24} xl={7}>
            <div className="footer-content__address__content">
              <div>
                <b>SĐT : </b>
                {mobilePhone}
              </div>
            </div>
            <div className="footer-content__address__content">
              <div>
                <b>Email : </b>
                {email}
              </div>
            </div>
          </Col>
        </Row>
      </footer>
      <Row className="copyright center-flex-item" justify="center">
        &#169; 2022 Tuyet Ho Diep Flower Shop
      </Row>
    </>
    // <footer>
    //   <div className="footer">
    //     <div className="footer__item">
    //       <Image src={ImageSvg.logo} alt="" />
    //     </div>
    //     <div className="footer__item">
    //       <div id={CONTACT_SECTION_ANCHOR} className="footer-social-list">
    //         {renderSocialList()}
    //       </div>
    //     </div>
    //     <div className="footer__item">
    //       <p className="footer__item__address">{address}</p>
    //     </div>
    //   </div>
    //   <Row className="copyright center-flex-item" justify="center">
    //     &#169; 2022 Tuyet Ho Diep Flower Shop
    //   </Row>
    // </footer>
  );
}
export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
