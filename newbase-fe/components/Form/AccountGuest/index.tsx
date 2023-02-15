import { Col, Form, Input, Row } from 'antd';
import Image from 'next/image';
import dayjs from 'dayjs';
import DatePickerInput from '../FormItem/DatePicker';
import ResetButton from '../FormItem/ResetButton';
import SearchIcon from 'public/svg/search.svg';

export const DEFAULT_SEARCH_PARAMS = {
  keyword: undefined,
  fromTimeAccess: undefined,
  toTimeAccess: undefined,
};

type PropsType = {
  setParams: any;
};

export default function AccountGuestForm({ setParams }: PropsType) {
  const [form] = Form.useForm();
  const today = dayjs().hour(23).minute(59).second(59).millisecond(999);

  const handleSearch = (values: any) => {
    let _fromTimeAccess, _toTimeAccess;
    const { keyword, fromTimeAccess, toTimeAccess } = values;
    if (fromTimeAccess) {
      const date = new Date(fromTimeAccess.$d);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      _fromTimeAccess = date;
    }
    if (toTimeAccess) {
      const date = new Date(toTimeAccess.$d);
      date.setHours(23);
      date.setMinutes(59);
      date.setSeconds(59);
      date.setMilliseconds(999);
      _toTimeAccess = date;
    }
    setParams({ keyword, fromTimeAccess: _fromTimeAccess, toTimeAccess: _toTimeAccess });
  };
  const submitForm = () => {
    form.submit();
  };
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      form.submit();
    }
  };
  const disableFromTimeAccess = (selectedDate: any) => {
    const date = dayjs(selectedDate);
    const toTimeAccess = form.getFieldValue('toTimeAccess');
    return date > today || (toTimeAccess && date > toTimeAccess);
  };
  const disableToTimeAccess = (selectedDate: any) => {
    const date = dayjs(selectedDate);
    const fromTimeAccess = form.getFieldValue('fromTimeAccess');
    return date > today || (fromTimeAccess && date < fromTimeAccess);
  };
  const handleResetForm = () => {
    form.resetFields();
    setParams(DEFAULT_SEARCH_PARAMS);
  };
  return (
    <Form name='basic' initialValues={DEFAULT_SEARCH_PARAMS} form={form} onFinish={handleSearch}>
      <Row gutter={16}>
        <Col span={10}>
          <Form.Item name='keyword'>
            <Input
              className='search-input'
              placeholder='Tìm kiếm theo SĐT'
              onKeyDown={handleKeyDown}
              prefix={<Image src={SearchIcon} height={16} width={16} alt='' />}
              autoComplete='off'
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name='fromTimeAccess'>
            <DatePickerInput placeholder='Bắt đầu lúc' disabledDate={disableFromTimeAccess} onChange={submitForm} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name='toTimeAccess'>
            <DatePickerInput placeholder='kết thúc lúc' disabledDate={disableToTimeAccess} onChange={submitForm} />
          </Form.Item>
        </Col>
        <Col>
          <ResetButton onClick={handleResetForm} />
        </Col>
      </Row>
    </Form>
  );
}
