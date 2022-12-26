import { Checkbox, Image, Row } from 'antd';
import moment from 'moment';
import { Void } from 'constants/type';
import { formatNumber } from './common';
import { DATE_FORMAT } from 'constants/common';
import Link from 'next/link';
import { WEB_URL } from 'constants/routes';

export const accountGuestColumns = (
  handleChangeCheckbox: (id: number) => void,
  checkedAll: boolean,
  handleCheckedAll: Void,
) => [
  {
    title: (
      <div className='center-flex-item'>
        <Checkbox checked={checkedAll} onChange={handleCheckedAll} />
      </div>
    ),
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

export const flowerListColumns = () => [
  {
    title: 'ID',
    dataIndex: 'id',
    sortField: 'flower.id',
    key: 'id',
    width: '25px',
    render: (id: number) => <Row wrap={false}>{formatNumber(id)}</Row>,
  },
  {
    title: 'Tên hoa',
    dataIndex: 'name',
    key: 'name',
    width: '500px',
    render: (name: string, props: any) => (
      <div>
        <Image src={props.thumbnail} alt='Ảnh đại diện' preview={false} height={50} width={50} />
        <span style={{ marginLeft: 12 }}>{name}</span>
      </div>
    ),
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    sorter: true,
    sortField: 'flower.price',
    key: 'price',
    width: '300px',
    render: (price: number) => <div>{formatNumber(price)} VND</div>,
  },
  {
    title: 'Thời điểm tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true,
    sortField: 'flower.createdAt',
    width: '300px',
    render: (createdAt: string) => <div>{moment(new Date(createdAt)).format(DATE_FORMAT.FULL_TIME)}</div>,
  },
  {
    title: '',
    key: 'detail',
    width: '100px',
    render: (props: any) => <Link href={WEB_URL.MANAGE_FLOWERS + '/' + props.id}>Xem chi tiết</Link>,
  },
];

export const topicListColumns = () => [
  {
    title: 'ID',
    dataIndex: 'id',
    sortField: 'topic.id',
    key: 'id',
    width: '25px',
    render: (id: number) => <Row wrap={false}>{formatNumber(id)}</Row>,
  },
  {
    title: 'Tên loại hoa',
    dataIndex: 'name',
    key: 'name',
    width: '500px',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    width: '500px',
  },
  {
    title: 'Thời điểm tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true,
    sortField: 'topic.createdAt',
    width: '300px',
    render: (createdAt: string) => <div>{moment(new Date(createdAt)).format(DATE_FORMAT.FULL_TIME)}</div>,
  },
  {
    title: '',
    key: 'detail',
    width: '100px',
    render: (props: any) => <Link href={WEB_URL.MANAGE_TOPICS + '/' + props.id}>Xem chi tiết</Link>,
  },
];