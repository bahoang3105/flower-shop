import { ReactElement, useMemo, useState } from 'react';
import { Table } from 'antd';
import { GetServerSideProps } from 'next';
import withServerSideProps from 'hoc/withServerSideProps';
import Admin from '@components//Layout/Admin';
import Pagination, { PAGE_SIZE } from '@components//Pagination';
import { useGetAccountGuests } from 'hooks/accountGuest';
import { SORT_TYPE } from 'constants/common';
import { accountGuestColumns } from 'utils/columns';
import { calculateNo, formatSorter } from 'utils/common';
import AccountGuestForm from '@components//Form/AccountGuest';

export default function AccountGuest() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE[0]);
  const [params, setParams] = useState<any>();
  const [sortField, setSortField] = useState<string>('guestPhone.timeAccess');
  const [sortValue, setSortValue] = useState<string>(SORT_TYPE.DESC);
  const [checkList, setCheckList] = useState<number[]>([]);
  const { data } = useGetAccountGuests({
    params: { page, limit: pageSize, sortField, sortValue, ...params },
  });
  const tableData = useMemo(() => {
    return data?.data?.items?.map((item: any, index: number) => ({
      ...item,
      no: calculateNo(page, pageSize, index),
      key: item?.id,
    }));
  }, [data]);
  const tableWithCheckList = tableData?.map((item: any) => ({
    ...item,
    checked: checkList.includes(item?.id),
  }));

  const handleChangePage = (page: number) => {
    setPage(page);
    setCheckList([]);
  };
  const handleChangePageSize = (pageSize: number) => {
    setPageSize(pageSize);
    setPage(1);
    setCheckList([]);
  };
  const handleChange = (pagination: any, filters: any, sorter: any): void => {
    setCheckList([]);
    if (sorter) {
      if (sorter.order) {
        setSortField(sorter?.column?.sortField);
        setSortValue(formatSorter(sorter.order));
      } else {
        setSortField('guestPhone.timeAccess');
        setSortValue(SORT_TYPE.DESC);
      }
    }
  };
  const handleChangeCheckbox = (id: number) => {
    const pos = checkList.indexOf(id);
    if (pos >= 0) {
      setCheckList((checkList) => [...checkList.slice(0, pos), ...checkList.slice(pos + 1)]);
    } else {
      setCheckList((checkList) => [...checkList, id]);
    }
  };

  return (
    <div className='account-guest'>
      <h1 className='page-title'>Quản lý tài khoản khách</h1>
      <AccountGuestForm setParams={setParams} />
      <Table
        columns={accountGuestColumns(handleChangeCheckbox)}
        dataSource={tableWithCheckList}
        pagination={false}
        scroll={{ x: 800 }}
        onChange={handleChange}
      />
      <Pagination
        showPageSize={true}
        total={data?.data?.meta?.totalItems || 0}
        current={page}
        pageSize={pageSize}
        onChange={handleChangePage}
        onChangePageSize={handleChangePageSize}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

AccountGuest.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
