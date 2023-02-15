import { Button, Checkbox, Col, Collapse, Row, Slider } from "antd";
import React, { useContext, useState } from "react";
import cx from "classnames";
import { useGetTopics } from "hooks/topic";
import { ProductListContext } from "..";
import { values } from "lodash";
import { APP_URL } from "constants/common";
import { useRouter } from "next/router";

const { Panel } = Collapse;

const SEARCH_GROUP_COLLAPSE_KEY = {
  SEARCH_BAR: "SEARCH_BAR",
  PRICE_RANGE: "PRICE_RANGE",
  PRODUCT_TYPE: "PRODUCT_TYPE",
};

const PRICE_MARK = [0, 25, 50, 75, 100];

export type filterType = {
  keyword: string;
  priceRange: {
    priceFrom: number | boolean;
    priceTo: number | boolean;
  };
  productType: number[];
  price: number;
};

function SearchGroup({ defaultValueInput }: any) {
  const router = useRouter();
  const { filter, setFilter, fetchProductList, setPage } =
    useContext<any>(ProductListContext);

  const { data: topicList } = useGetTopics({
    params: {
      limit: 10000000000,
      page: 1,
      flowersPerTopic: 0,
      getEmptyTopic: true,
    },
  });

  const onChangePriceSlide = (val: any) => {
    setFilter((prev: filterType) => ({ ...prev, priceRange: val }));
  };

  const onSubmit = () => {
    router.push(APP_URL.PRODUCT_LIST, undefined, { shallow: true });
    fetchProductList({ pageProps: 1 });
    setPage(1);
  };

  const handleKeyDown = (e: any) => {
    if (e?.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="search-group">
      <Collapse
        defaultActiveKey={[
          SEARCH_GROUP_COLLAPSE_KEY.SEARCH_BAR,
          SEARCH_GROUP_COLLAPSE_KEY.PRICE_RANGE,
          SEARCH_GROUP_COLLAPSE_KEY.PRODUCT_TYPE,
        ]}
        expandIconPosition="end"
      >
        <Panel header="Tìm kiếm" key={SEARCH_GROUP_COLLAPSE_KEY.SEARCH_BAR}>
          <input
            defaultValue={defaultValueInput}
            className="search-group__keyword"
            onKeyDown={handleKeyDown}
            onChange={(e) =>
              setFilter((prev: filterType) => ({
                ...prev,
                keyword: e?.target?.value,
              }))
            }
            placeholder="Tìm kiếm theo tên, id của hoa"
          />
        </Panel>
        <Panel header="Giá (VND)" key={SEARCH_GROUP_COLLAPSE_KEY.PRICE_RANGE}>
          <Row
            className="search-group__price-range-input"
            wrap={false}
            justify="space-between"
            align="middle"
          >
            <Col
              flex="0 0 100px"
              className="search-group__price-range-input__item"
            >
              <input
                onChange={(e) =>
                  setFilter((prev: filterType) => ({
                    ...prev,
                    priceRange: {
                      ...prev?.priceRange,
                      priceFrom: e?.target?.value as any,
                    },
                  }))
                }
                onKeyDown={handleKeyDown}
                placeholder="Min"
                type="number"
              />
            </Col>
            <Col className="search-group__price-range-input__separate-item" />
            <Col
              flex="0 0 100px"
              className="search-group__price-range-input__item"
            >
              <input
                onChange={(e) =>
                  setFilter((prev: filterType) => ({
                    ...prev,
                    priceRange: {
                      ...prev?.priceRange,
                      priceTo: e?.target?.value as any,
                    },
                  }))
                }
                onKeyDown={handleKeyDown}
                placeholder="Max"
                type="number"
              />
            </Col>
          </Row>
          {/* <div className="search-group__price-range-slider">
            <Slider
              value={filter?.price}
              onChange={onChangePriceSlide}
              defaultValue={0}
            />
            <Row justify="space-between">
              {PRICE_MARK?.map((val) => (
                <Col
                  key={val}
                  onClick={() =>
                    setFilter((prev: filterType) => ({ ...prev, price: val }))
                  }
                  className={cx(
                    "search-group__price-range-slider__mark-item cursor-pointer ",
                    {
                      selected: filter?.price === val,
                    }
                  )}
                >
                  {val}
                </Col>
              ))}
            </Row>
          </div> */}
        </Panel>
        <Panel header="Loại hoa" key={SEARCH_GROUP_COLLAPSE_KEY.PRODUCT_TYPE}>
          <div className="search-group__filter-group">
            <Checkbox.Group
              value={filter?.productType}
              onChange={(val: any) => {
                setFilter((prev: filterType) => ({
                  ...prev,
                  productType: val,
                }));
              }}
            >
              <Row>
                {topicList?.data?.items?.map(
                  ({
                    name,
                    id,
                  }: {
                    name: string;
                    description: string;
                    id: number;
                    isDelete: boolean;
                  }) => {
                    return (
                      <Col key={id} span={24}>
                        <Checkbox value={id}>{name}</Checkbox>
                      </Col>
                    );
                  }
                )}
              </Row>
            </Checkbox.Group>
          </div>
        </Panel>
        <div className="search-group__submit-btn-group">
          <button
            type="button"
            onClick={onSubmit}
            className="search-group__submit-btn-group__submit-btn cursor-pointer"
          >
            Tìm kiếm
          </button>
        </div>
      </Collapse>
    </div>
  );
}

export default SearchGroup;
