import React, { FC } from 'react';
import cn from 'classnames';
import { Col, Pagination as PaginationAnt, Row } from 'antd';
import { useWindowSize } from 'hooks/useWindowSize';

export const PAGE_SIZE = [10, 20, 50];
const XS_SIZE = 575;
const TOTAL_PAGE_IF_NO_DATA = 1;

type POSITION_TYPE = 'right' | 'center';
const Pagination: FC<{
  pageSize: number;
  onChangePageSize?: (value: number) => void;
  current: number;
  onChange: (value: number) => void;
  total: number;
  showPageSize?: boolean;
  position?: POSITION_TYPE;
}> = ({ pageSize, onChangePageSize, current, onChange, total, showPageSize = false, position = 'right' }) => {
  const handleChangePageSize = (e: any): void => {
    onChangePageSize?.(parseInt(e.target.value));
  };
  const { width } = useWindowSize();
  const renderPageSize = () => {
    return PAGE_SIZE.map((size, index) => (
      <option value={size} key={index}>
        {size}/Trang
      </option>
    ));
  };
  const totalIteamAnt = total > 0 ? total : TOTAL_PAGE_IF_NO_DATA;

  return (
    <Row className={cn({ 'pagination__xs-size': width <= XS_SIZE }, 'my-pagination')}>
      {showPageSize && (
        <Col xs={24} sm={12}>
          <select className='page-size' value={pageSize} onChange={handleChangePageSize}>
            {renderPageSize()}
          </select>
        </Col>
      )}
      <Col xs={24} sm={24}>
        <PaginationAnt
          simple
          total={totalIteamAnt}
          pageSize={pageSize}
          current={current}
          onChange={onChange}
          className={cn('pagination-component', { center: position === 'center' }, { right: position === 'right' })}
        />
      </Col>
    </Row>
  );
};

export default Pagination;
