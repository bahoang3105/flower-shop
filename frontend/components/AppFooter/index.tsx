import { Col, Image, Row } from 'antd';
import PublicImage from 'public/images';
import ImageSvg from 'public/svg';

export default function Footer() {
  const SOCIAL_LIST = [
    { key: 1, srcImage: PublicImage.facebook, url: '' },
    { key: 2, srcImage: PublicImage.messenger, url: '' },
    { key: 3, srcImage: PublicImage.zalo, url: '' },
    { key: 4, srcImage: PublicImage.phone, url: '' },
  ];

  const renderSocialList = () => {
    return SOCIAL_LIST.map((item) => (
      <div key={item.key} className='footer-social-list__item'>
        <a href={item.url}>
          <Image src={item.srcImage} preview={false} height={36} width={36} />
        </a>
      </div>
    ));
  };

  return (
    <footer>
      <Row className='footer' justify='space-around'>
        <Col>
          <Image src={ImageSvg.logo} preview={false} />
          <div className='footer-social-list'>{renderSocialList()}</div>
        </Col>
      </Row>
      <Row className='copyright center-flex-item' justify='center'>
        &#169; 2022 Tuyet Ho Diep Flower Shop
      </Row>
    </footer>
  );
}
