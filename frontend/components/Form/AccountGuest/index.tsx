import { Col, DatePicker, Form, Image, Input, Row } from 'antd';
import SearchIcon from 'public/svg/search.svg';
import ReloadIcon from 'public/svg/reload.svg';
import DatePickerIcon from 'public/svg/date-picker.svg';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'constants/common';

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
  const suffixIcon = <Image src={DatePickerIcon} height={16.67} width={16.67} alt='' />;

  const handleSearch = (values: any) => {
    let _fromTimeAccess, _toTimeAccess;
    const { keyword, fromTimeAccess, toTimeAccess } = values;
    if (fromTimeAccess) {
      const date = new Date(fromTimeAccess._d);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      _fromTimeAccess = date;
    }
    if (toTimeAccess) {
      const date = new Date(toTimeAccess._d);
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
    setParams(undefined);
  };
  return (
    <Form
      className='account-guest-form'
      name='basic'
      initialValues={DEFAULT_SEARCH_PARAMS}
      form={form}
      onFinish={handleSearch}
    >
      <Row gutter={16}>
        <Col span={10}>
          <Form.Item name='keyword'>
            <Input
              className='account-guest-form__input-search'
              placeholder='Tìm kiếm theo SĐT'
              onKeyDown={handleKeyDown}
              prefix={<Image src={SearchIcon} preview={false} height={16} width={16} />}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name='fromTimeAccess'>
            <DatePicker
              format={DATE_FORMAT.DATE_MONTH_YEAR}
              className='account-guest-form__date'
              placeholder='Bắt đầu lúc'
              inputReadOnly={true}
              suffixIcon={suffixIcon}
              disabledDate={disableFromTimeAccess}
              onChange={submitForm}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name='toTimeAccess'>
            <DatePicker
              format={DATE_FORMAT.DATE_MONTH_YEAR}
              className='account-guest-form__date'
              placeholder='kết thúc lúc'
              inputReadOnly={true}
              suffixIcon={suffixIcon}
              disabledDate={disableToTimeAccess}
              onChange={submitForm}
            />
          </Form.Item>
        </Col>
        <Col>
          <Image
            className='account-guest-form__reset'
            src={ReloadIcon}
            height={16}
            width={16}
            alt=''
            onClick={handleResetForm}
            preview={false}
          />
        </Col>
      </Row>
    </Form>
  );
}
