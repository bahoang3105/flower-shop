import { Checkbox, Row } from 'antd';
import moment from 'moment';
import { DATE_FORMAT, formatNumber } from './common';

export const accountGuestColumns = (handleChangeCheckbox: (id: number) => void) => {
  return [
    {
      key: 'checkbox',
      dataIndex: 'checked',
      width: '25px',
      render: (checked: boolean, props: any) => (
        <div className='center-flex-item'>
          <Checkbox checked={checked} onChange={() => handleChangeCheckbox(props?.id)} />
        </div>
      ),
    },
    {
      title: 'STT',
      dataIndex: 'no',
      key: 'no',
      width: '25px',
      render: (no: number) => <Row wrap={false}>{formatNumber(no)}</Row>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '300px',
    },
    {
      title: 'Địa chỉ truy cập',
      dataIndex: 'pageAccess',
      key: 'pageAccess',
      width: '300px',
      render: (pageAccess: string, props: any) => (
        <a target='_blank' href={props?.pageLink}>
          {pageAccess}
        </a>
      ),
    },
    {
      title: 'Thời gian truy cập',
      dataIndex: 'timeAccess',
      sorter: true,
      sortField: 'guestPhone.timeAccess',
      key: 'timeAccess',
      width: '300px',
      render: (timeAccess: string) => {
        const date = new Date(timeAccess);
        return moment(date).format(DATE_FORMAT.FULL_TIME);
      },
    },
  ];
};
