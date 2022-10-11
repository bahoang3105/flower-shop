import { Formik } from 'formik';
import { ReactElement, useMemo, useState } from 'react';
import { Col, Form, Image, Row, Table } from 'antd';
import { GetServerSideProps } from 'next';
import withServerSideProps from 'hoc/withServerSideProps';
import Admin from '@components//Layout/Admin';
import Pagination, { PAGE_SIZE } from '@components//Pagination';
import FormItem, { TYPE_INPUT } from '@components//FormItem';
import SearchIcon from 'public/svg/search.svg';
import ReloadIcon from 'public/svg/reload.svg';
import DatePickerIcon from 'public/svg/date-picker.svg';
import { useGetAccountGuests } from 'hooks/accountGuest';
import { DATE_FORMAT, SORT_TYPE } from 'constants/common';
import { accountGuestColumns } from 'utils/columns';
import { calculateNo, formatSorter } from 'utils/common';
import dayjs from 'dayjs';

export const DEFAULT_SEARCH_PARAMS = {
  keyword: undefined,
  fromTimeAccess: undefined,
  toTimeAccess: undefined,
};

export default function AccountGuest() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE[0]);
  const [keyword, setKeyword] = useState<string>();
  const [fromTimeAccess, setFromTimeAccess] = useState<any>();
  const [toTimeAccess, setToTimeAccess] = useState<any>();
  const [sortField, setSortField] = useState<string>('guestPhone.timeAccess');
  const [sortValue, setSortValue] = useState<string>(SORT_TYPE.DESC);
  const [checkList, setCheckList] = useState<number[]>([]);
  const today = dayjs().hour(23).minute(59).second(59).millisecond(999);
  const suffixIcon = <Image src={DatePickerIcon} height={16.67} width={16.67} alt='' />;
  const { data } = useGetAccountGuests({
    params: { keyword, page, limit: pageSize, sortField, sortValue, fromTimeAccess, toTimeAccess },
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
  const handleSubmit = (value: any) => {
    const { fromTimeAccess, toTimeAccess, keyword } = value;
    setKeyword(keyword);
    if (fromTimeAccess) {
      setFromTimeAccess(dayjs(fromTimeAccess));
    } else {
      setFromTimeAccess(undefined);
    }
    if (toTimeAccess) {
      setToTimeAccess(dayjs(toTimeAccess));
    } else {
      setToTimeAccess(undefined);
    }
    setPage(1);
  };
  const disableFromDate = (selectedDate: any) => {
    const date = dayjs(selectedDate);
    return date > today || (toTimeAccess && date > toTimeAccess);
  };
  const disableToDate = (selectedDate: any) => {
    const date = dayjs(selectedDate);
    return date > today || (fromTimeAccess && date < fromTimeAccess);
  };

  return (
    <div className='account-guest'>
      <h1 className='page-title'>Quản lý tài khoản khách</h1>
      <Formik initialValues={DEFAULT_SEARCH_PARAMS} onSubmit={handleSubmit}>
        {({ setFieldValue, resetForm, submitForm }) => {
          const handleKeyDown = (e: any) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              submitForm();
            }
          };
          const onReset = () => {
            resetForm();
            setFromTimeAccess(undefined);
            setToTimeAccess(undefined);
            setKeyword('');
            setPage(1);
          };
          const handleChangDate = (field: any, value: any) => {
            if (value) {
              const date = new Date(value?._d);
              const isFromDate = field.name === 'fromTimeAccess';
              date.setHours(isFromDate ? 0 : 23);
              date.setMinutes(isFromDate ? 0 : 59);
              date.setSeconds(isFromDate ? 0 : 59);
              date.setMilliseconds(isFromDate ? 0 : 999);
              value._d = date;
            }
            setFieldValue(field.name, value);
            submitForm();
          };
          return (
            <Form className='account-form'>
              <Row gutter={24}>
                <Col span={10}>
                  <FormItem
                    name='keyword'
                    placeholder='Tìm kiếm theo SĐT'
                    typeInput={TYPE_INPUT.TEXT}
                    onKeyDown={handleKeyDown}
                    disabledDate={disableFromDate}
                    prefix={<Image src={SearchIcon} height={16} width={16} alt='search-icon' />}
                  />
                </Col>
                <Col>
                  <FormItem
                    name='fromTimeAccess'
                    placeholder='Bắt đầu từ'
                    suffix={suffixIcon}
                    typeInput={TYPE_INPUT.DATE_PICKER}
                    onChange={handleChangDate}
                    disabledDate={disableFromDate}
                    format={DATE_FORMAT.DATE_MONTH_YEAR}
                    inputReadOnly={true}
                  />
                </Col>
                <Col>
                  <FormItem
                    name='toTimeAccess'
                    placeholder='Bắt đầu từ'
                    suffix={suffixIcon}
                    typeInput={TYPE_INPUT.DATE_PICKER}
                    onChange={handleChangDate}
                    disabledDate={disableToDate}
                    format={DATE_FORMAT.DATE_MONTH_YEAR}
                    inputReadOnly={true}
                  />
                </Col>

                <Col>
                  <Image src={ReloadIcon} height={16} width={16} alt='' onClick={onReset} preview={false} />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
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
