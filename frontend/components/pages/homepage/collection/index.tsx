import { Col, Image, Row } from 'antd';
import PublicImage from 'public/images';
import { useCallback } from 'react';

export default function FollowerCollection() {
  const renderCollectionItem = useCallback(
    (imageSrc: string, className: string) => (
      <div className={className} style={{ position: 'relative' }}>
        <Image src={imageSrc} preview={false} />
        <div className='button-buy-now'>Mua Ngay</div>
      </div>
    ),
    [],
  );

  return (
    <>
      <Row wrap className='collection' gutter={16}>
        <Col span={24} className='collection__item'>
          <div className='collection__title center-flex-item'>Bộ sưu tập</div>
          {renderCollectionItem(PublicImage.banner1, 'collection__item__1')}
        </Col>
        <Col span={24} className='collection__item'>
          {renderCollectionItem(PublicImage.banner2, 'collection__item__2')}
        </Col>
      </Row>
      <Row className='collection' gutter={16}>
        <Col span={24} className='collection__item'>
          {renderCollectionItem(PublicImage.banner3, 'collection__item__3')}
        </Col>
        <Col span={24} className='collection__item'>
          {renderCollectionItem(PublicImage.banner4, 'collection__item__4')}
        </Col>
      </Row>
    </>
  );
}
