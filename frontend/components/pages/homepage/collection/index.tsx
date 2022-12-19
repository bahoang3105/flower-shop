import { Col, Row } from 'antd';
import PublicImage from 'public/images';

const BTN_BUYNOW_TYPE_CLASSNAME = {
  [2]: 'btn-buynow-type-2',
  [3]: 'btn-buynow-type-3',
  [4]: 'btn-buynow-type-4',
};

type BtnBuyNowType = 2 | 3 | 4;

export default function FlowerCollection() {
  const renderCommonCollectionItem = (imageSrc: string, importClass: string) => (
    <div className='flower-collection__common-item'>
      <img className='flower-collection__common-item__image-group' src={imageSrc} alt='' />
      <div className={`flower-collection__common-item__button-buy-now ${importClass}`}>Mua Ngay</div>
    </div>
  );

  return (
    <>
      <Row wrap className='flower-collection' gutter={[16, 16]}>
        <Col span={24} lg={12}>
          <div className='flower-collection__first-item'>
            <div className='flower-collection__first-item__content'>
              <div className='flower-collection__first-item__content__image-group'>
                <div className='flower-collection__first-item__content__collection-group center-flex-item'>
                  <div>BỘ SƯU TẬP</div>
                </div>
                <img src={PublicImage.banner1} alt='' />
                <div className='flower-collection__first-item__content__image-group__button-buy-now'>Mua Ngay</div>
              </div>
            </div>
          </div>
        </Col>
        {[PublicImage.banner2, PublicImage.banner3, PublicImage.banner4]?.map((src, index) => {
          return (
            <Col span={24} lg={12}>
              {renderCommonCollectionItem(src, BTN_BUYNOW_TYPE_CLASSNAME[(index + 2) as BtnBuyNowType])}
            </Col>
          );
        })}
      </Row>
    </>
  );
}

{
  /* <div className='flower-collection__first-item'>
            <div className='flower-collection__first-item__item'>
              <div className='flower-collection__first-item__item__title center-flex-item'>Bộ sưu tập</div>
              <img className='flower-collection__first-item__item__main-img' src={PublicImage.banner1} alt='' />
              <div className='button-buy-now btn__1'>Mua Ngay</div>
            </div>
          </div> */
}
