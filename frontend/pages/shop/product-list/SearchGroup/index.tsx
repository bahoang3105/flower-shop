import { Button, Checkbox, Col, Collapse, Row, Slider } from 'antd';
import React, { useState } from 'react';
import cx from 'classnames';
import { useGetTopics } from 'hooks/topic';

const { Panel } = Collapse;

const SEARCH_GROUP_COLLAPSE_KEY = {
  SEARCH_BAR: 'SEARCH_BAR',
  PRODUCT_TYPE: 'PRODUCT_TYPE',
};

const PRICE_MARK = [0, 25, 50, 75, 100];

export type filterType = {
  priceRange: {
    priceFrom: number | boolean;
    priceTo: number | boolean;
  };
  productType: string[];
  price: number;
};

function SearchGroup({ onSubmitFilter }: { onSubmitFilter: any }) {
  const { data: topicList } = useGetTopics({
    params: { limit: 10000000000, page: 1, flowersPerTopic: 0 },
  });
  const [filter, setFilter] = useState<filterType>({
    priceRange: { priceFrom: false, priceTo: false },
    productType: [],
    price: 0,
  });

  const onChangePriceSlide = (val: any) => {
    setFilter((prev) => ({ ...prev, priceRange: val }));
  };

  const onSubmit = () => {
    onSubmitFilter(filter);
  };

  return (
    <div className='search-group'>
      <Collapse
        defaultActiveKey={[SEARCH_GROUP_COLLAPSE_KEY.SEARCH_BAR, SEARCH_GROUP_COLLAPSE_KEY.PRODUCT_TYPE]}
        expandIconPosition='right'
      >
        <Panel header='Price' key={SEARCH_GROUP_COLLAPSE_KEY.SEARCH_BAR}>
          <Row className='search-group__price-range-input' wrap={false} justify='space-between' align='middle'>
            <Col flex='0 0 100px' className='search-group__price-range-input__item'>
              <input
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    priceRange: {
                      ...prev?.priceRange,
                      priceFrom: e?.target?.value as any,
                    },
                  }))
                }
                placeholder='Min'
                type='number'
              />
            </Col>
            <Col className='search-group__price-range-input__separate-item' />
            <Col flex='0 0 100px' className='search-group__price-range-input__item'>
              <input
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    priceRange: {
                      ...prev?.priceRange,
                      priceTo: e?.target?.value as any,
                    },
                  }))
                }
                placeholder='Max'
                type='number'
              />
            </Col>
          </Row>
          <div className='search-group__price-range-slider'>
            <Slider value={filter?.price} onChange={onChangePriceSlide} defaultValue={0} />
            <Row justify='space-between'>
              {PRICE_MARK?.map((val) => (
                <Col
                  onClick={() => setFilter((prev) => ({ ...prev, price: val }))}
                  className={cx('search-group__price-range-slider__mark-item cursor-pointer ', {
                    selected: filter?.price === val,
                  })}
                >
                  {val}
                </Col>
              ))}
            </Row>
          </div>
        </Panel>
        <Panel header='Product Type' key={SEARCH_GROUP_COLLAPSE_KEY.PRODUCT_TYPE}>
          <div className='search-group__filter-group'>
            <Checkbox.Group
              onChange={(val: any) => {
                setFilter((prev) => ({ ...prev, productType: val }));
              }}
            >
              <Row>
                {topicList?.data?.map(
                  ({ name, id }: { name: string; description: string; id: number; isDelete: boolean }) => {
                    return (
                      <Col span={24}>
                        <Checkbox value={id}>{name}</Checkbox>
                      </Col>
                    );
                  },
                )}
              </Row>
            </Checkbox.Group>
          </div>
        </Panel>
        <div className='search-group__submit-btn-group'>
          <button
            type='button'
            onClick={() => onSubmit()}
            className='search-group__submit-btn-group__submit-btn cursor-pointer'
          >
            Search
          </button>
        </div>
      </Collapse>
    </div>
  );
}

export default SearchGroup;
