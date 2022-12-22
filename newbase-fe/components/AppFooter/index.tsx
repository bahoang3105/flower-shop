import { Row } from "antd";
import Image from "next/image";
import PublicImage from "public/images";
import ImageSvg from "public/svg";

export default function Footer() {
  const SOCIAL_LIST = [
    { key: 1, srcImage: PublicImage.facebook, url: "" },
    { key: 2, srcImage: PublicImage.messenger, url: "" },
    { key: 3, srcImage: PublicImage.zalo, url: "" },
    { key: 4, srcImage: PublicImage.phone, url: "" },
  ];

  const renderSocialList = () => {
    return SOCIAL_LIST.map((item) => (
      <div key={item.key} className="footer-social-list__item">
        <a href={item.url}>
          <Image src={item.srcImage} alt="" height={36} width={36} />
        </a>
      </div>
    ));
  };

  return (
    <footer>
      <div className="footer">
        <div className="footer__item">
          <Image src={ImageSvg.logo} alt="" />
        </div>
        <div className="footer__item">
          <div className="footer-social-list">{renderSocialList()}</div>
        </div>
        {/* <div className='footer__item footer-get-in-touch'>GET IN TOUCH</div>
        <div className='footer__item footer-get-in-touch__content'>
          <p>0912345678</p>
          <p>
            Email: support@vprintes.com Support Time: Mon - Fri: 9AM-5PM EST Add: 68 Circular Road #02-01, 049422,
            Singapore
          </p>
        </div> */}
      </div>
      <Row className="copyright center-flex-item" justify="center">
        &#169; 2022 Tuyet Ho Diep Flower Shop
      </Row>
    </footer>
  );
}
