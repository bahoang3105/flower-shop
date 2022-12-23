import { Row } from "antd";
import { useGetWebInfo } from "hooks/webInfo";
import Image from "next/image";
import PublicImage from "public/images";
import ImageSvg from "public/svg";
import { CONTACT_SECTION_ANCHOR } from "../AppHeader";

export default function Footer() {
  const { data: webInfo } = useGetWebInfo();
  const { address, email, facebookLink, mobilePhone, title, zaloLink } =
    webInfo?.data || {};

  const SOCIAL_LIST = [
    { key: 1, srcImage: PublicImage.facebook, url: facebookLink },
    { key: 2, srcImage: PublicImage.messenger, url: email },
    { key: 3, srcImage: PublicImage.zalo, url: zaloLink },
    { key: 4, srcImage: PublicImage.phone, url: mobilePhone },
  ];

  const renderSocialList = () => {
    return SOCIAL_LIST.map((item) => {
      if (item?.key === 4) {
        <a
          key={item.key}
          className="footer-social-list__item"
          href={"tel:+84965605123"}
        >
          <Image src={item.srcImage} alt="" height={36} width={36} />
        </a>;
      }
      return (
        <div key={item.key} className="footer-social-list__item">
          <a href={item.url}>
            <Image src={item.srcImage} alt="" height={36} width={36} />
          </a>
        </div>
      );
    });
  };

  return (
    <footer>
      <div className="footer">
        <div className="footer__item">
          <Image src={ImageSvg.logo} alt="" />
        </div>
        <div className="footer__item">
          <div id={CONTACT_SECTION_ANCHOR} className="footer-social-list">
            {renderSocialList()}
          </div>
        </div>
        <div className="footer__item">
          <p className="footer__item__address">{address}</p>
        </div>
      </div>
      <Row className="copyright center-flex-item" justify="center">
        &#169; 2022 Tuyet Ho Diep Flower Shop
      </Row>
    </footer>
  );
}
export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
