import { ReactElement, useMemo, useRef, useState } from 'react';
import Admin from '@components//Layout/Admin';
import SearchIcon from 'public/svg/search.svg';
import { GetServerSideProps } from 'next';
import AppButton from '@components//AppButton';
import { WEB_URL } from 'constants/routes';
import { Col, Image, Input, Row, Table } from 'antd';
import { useGetTopics } from 'hooks/topic';
import Pagination, { PAGE_SIZE } from '@components//Pagination';
import { SORT_TYPE } from 'constants/common';
import { formatSorter } from 'utils/common';
import { topicListColumns } from 'utils/columns';

export default function Topics() {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE[0]);
  const [sortField, setSortField] = useState<string>('topic.id');
  const [sortValue, setSortValue] = useState<string>(SORT_TYPE.ASC);
  const inputRef = useRef<any>();
  const { data } = useGetTopics({ params: { keyword: searchText, limit: pageSize, page, sortField, sortValue } });
  const tableData = useMemo(() => {
    return data?.data?.items?.map((item: any) => ({ ...item, key: item.id }));
  }, [data]);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      setSearchText(inputRef.current.input.value);
    }
  };
  const handleChange = (pagination: any, filters: any, sorter: any): void => {
    if (sorter) {
      if (sorter.order) {
        setSortField(sorter?.column?.sortField);
        setSortValue(formatSorter(sorter.order));
      } else {
        setSortField('flower.id');
        setSortValue(SORT_TYPE.ASC);
      }
    }
  };
  const handleChangePage = (page: number) => {
    setPage(page);
  };
  const handleChangePageSize = (pageSize: number) => {
    setPage(1);
    setPageSize(pageSize);
  };

  return (
    <div className='manage-flowers'>
      <h1 className='page-title'>Quản lý loại hoa</h1>
      <AppButton
        className='manage-flowers__create-button'
        text='Thêm mới loại hoa'
        variant='primary'
        href={WEB_URL.CREATE_TOPIC}
      />
      <Row>
        <Col span={10}>
          <Input
            ref={inputRef}
            className='search-input'
            placeholder='Tìm kiếm theo tên loại hoa, ID'
            onKeyDown={handleKeyDown}
            prefix={<Image src={SearchIcon} preview={false} height={16} width={16} />}
            autoComplete='off'
          />
        </Col>
      </Row>
      <Table
        style={{ marginBottom: 20, marginTop: 20 }}
        columns={topicListColumns()}
        dataSource={tableData}
        pagination={false}
        scroll={{ x: 800 }}
        onChange={handleChange}
      />
      <Pagination
        current={page}
        pageSize={pageSize}
        showPageSize={true}
        onChange={handleChangePage}
        onChangePageSize={handleChangePageSize}
        total={data?.data?.meta?.totalItems}
      />
    </div>
  );
}

Topics.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
