import { ReactElement, useMemo, useRef, useState } from 'react';
import Admin from '@components//Layout/Admin';
import SearchIcon from 'public/svg/search.svg';
import AppButton from '@components//AppButton';
import { WEB_URL } from 'constants/routes';
import { Col, Input, Row, Table } from 'antd';
import Image from 'next/image';
import { useGetTopics } from 'hooks/topic';
import Pagination, { PAGE_SIZE } from '@components//Pagination';
import { SORT_TYPE } from 'constants/common';
import { formatSorter } from 'utils/common';
import { topicListColumns } from 'utils/columns';

export default function Topics() {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE[0]);
  const [sortField, setSortField] = useState<string>('topic.createdAt');
  const [sortValue, setSortValue] = useState<string>(SORT_TYPE.DESC);
  const inputRef = useRef<any>();
  const { data } = useGetTopics({ params: { keyword: searchText, limit: pageSize, page, sortField, sortValue, getEmptyTopic: true } });
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
        setSortField('topic.createdAt');
        setSortValue(SORT_TYPE.DESC);
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
            prefix={<Image src={SearchIcon} alt='' height={24} width={24} />}
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
