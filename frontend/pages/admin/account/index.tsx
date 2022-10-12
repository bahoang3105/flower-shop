import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Col, Modal, Row, Table, Tooltip } from 'antd';
import { GetServerSideProps } from 'next';
import withServerSideProps from 'hoc/withServerSideProps';
import Admin from '@components//Layout/Admin';
import Pagination, { PAGE_SIZE } from '@components//Pagination';
import { useDeleteAccountGuests, useGetAccountGuests } from 'hooks/accountGuest';
import { SORT_TYPE, TYPE_MESSAGE } from 'constants/common';
import { accountGuestColumns } from 'utils/columns';
import { calculateNo, formatSorter } from 'utils/common';
import AccountGuestForm from '@components//Form/AccountGuest';
import AppButton from '@components//AppButton';
import showMessage from '@components//Message';

export default function AccountGuest() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE[0]);
  const [params, setParams] = useState<any>();
  const [checkedAll, setCheckedAll] = useState(false);
  const [sortField, setSortField] = useState<string>('guestPhone.timeAccess');
  const [open, setOpen] = useState(false);
  const [sortValue, setSortValue] = useState<string>(SORT_TYPE.DESC);
  const [checkList, setCheckList] = useState<number[]>([]);
  const { data, refetch } = useGetAccountGuests({
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
    setCheckedAll(false);
    setCheckList([]);
  };
  const handleChangePageSize = (pageSize: number) => {
    setPageSize(pageSize);
    setPage(1);
    setCheckList([]);
    setCheckedAll(false);
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
      setCheckedAll(false);
      setCheckList((checkList) => [...checkList.slice(0, pos), ...checkList.slice(pos + 1)]);
    } else {
      setCheckList((checkList) => [...checkList, id]);
    }
  };
  const handleCheckedAll = () => {
    if (checkedAll) {
      setCheckedAll(false);
      setCheckList([]);
    } else {
      setCheckedAll(true);
      setCheckList(tableData.map((item: any) => item.id));
    }
  };
  const handleOpenModal = () => {
    if (checkList.length > 0) {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSuccess = () => {};

  const { mutateAsync } = useDeleteAccountGuests({ onSuccess: handleSuccess });
  const handleDelete = async () => {
    const res = await mutateAsync({ listGuestPhoneId: checkList });
    if (res?.data?.data?.success) {
      showMessage(TYPE_MESSAGE.SUCCESS, 'Đã xóa thành công');
      setOpen(false);
      setCheckList([]);
      setCheckedAll(false);
      refetch();
    } else {
      showMessage(TYPE_MESSAGE.ERROR, 'Lỗi: ' + res?.data?.response?.message?.message);
    }
  };
  useEffect(() => {
    if (data?.data?.items?.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [data]);

  return (
    <div className='account-guest'>
      <h1 className='page-title'>Quản lý tài khoản khách</h1>
      <AccountGuestForm setParams={setParams} />
      <h4>{`Hiển thị ${data?.data?.meta?.itemCount} trên ${data?.data?.meta?.totalItems} kết quả`}</h4>
      <Tooltip title='Xóa những tài khoản khách được chọn'>
        <AppButton
          text='Xóa'
          variant={checkList.length > 0 ? 'danger' : 'disabled'}
          className='account-guest__delete-button'
          onClick={handleOpenModal}
        />
      </Tooltip>
      <Table
        columns={accountGuestColumns(handleChangeCheckbox, checkedAll, handleCheckedAll)}
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
      <Modal visible={open} onCancel={handleClose} title='Xóa bản ghi tài khoản khách' footer={null}>
        <div className='modal-account-content'>
          Bạn có chắc chắn muốn <span>xóa&nbsp;{checkList.length} bản ghi tài khoản khách</span> hay không?
        </div>
        <Row justify='end' gutter={16}>
          <Col>
            <AppButton text='Hủy' variant='primary' onClick={handleClose} />
          </Col>
          <Col>
            <AppButton text='Xóa' variant='danger' onClick={handleDelete} />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

AccountGuest.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
