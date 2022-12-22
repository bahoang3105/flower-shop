import { Table } from 'antd';
import { ReactElement, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import Admin from '@components//Layout/Admin';
import AppButton from '@components//AppButton';
import FlowerForm from '@components//Form/FlowerForm';
import Pagination, { PAGE_SIZE } from '@components//Pagination';
import withServerSideProps from 'hoc/withServerSideProps';
import { WEB_URL } from 'constants/routes';
import { formatSorter } from 'utils/common';
import { useGetFlowers } from 'hooks/flower';
import { SORT_TYPE } from 'constants/common';
import { flowerListColumns } from 'utils/columns';

export default function Flowers() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE[0]);
  const [params, setParams] = useState<any>();
  const [sortField, setSortField] = useState<string>('flower.id');
  const [sortValue, setSortValue] = useState<string>(SORT_TYPE.ASC);
  const { data } = useGetFlowers({ params: { ...params, limit: pageSize, page, sortField, sortValue } });
  const tableData = useMemo(() => {
    return data?.items?.map((flower: any) => ({
      ...flower,
      key: flower.id,
      thumbnail: flower.listImage[0]?.filePath,
    }));
  }, [data]);

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
      <h1 className='page-title'>Quản lý hoa</h1>
      <AppButton
        className='manage-flowers__create-button'
        text='Thêm mới hoa'
        variant='primary'
        href={WEB_URL.CREATE_FLOWER}
      />
      <FlowerForm setParams={setParams} />
      <Table
        style={{ marginBottom: 20 }}
        columns={flowerListColumns()}
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
        total={data?.meta?.totalItems}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

Flowers.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
