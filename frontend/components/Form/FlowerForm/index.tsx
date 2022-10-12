import { Col, Form, Image, Input, Row } from 'antd';
import SearchIcon from 'public/svg/search.svg';
import ResetButton from '../FormItem/ResetButton';

type PropsType = {
  setParams: any;
};

export const DEFAULT_SEARCH_PARAMS = {
  keyword: undefined,
  fromTimeAccess: undefined,
  toTimeAccess: undefined,
};

export default function FlowerForm({ setParams }: PropsType) {
  const [form] = Form.useForm();

  const handleSearch = (values: any) => {};
  const submitForm = () => {
    form.submit();
  };
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      form.submit();
    }
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
              placeholder='Tìm kiếm theo tên'
              onKeyDown={handleKeyDown}
              prefix={<Image src={SearchIcon} preview={false} height={16} width={16} />}
              autoComplete='off'
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name='fromTimeAccess'></Form.Item>
        </Col>
        <Col>
          <Form.Item name='toTimeAccess'></Form.Item>
        </Col>
        <Col>
          <ResetButton className='account-guest-form__reset' onClick={handleResetForm} />
        </Col>
      </Row>
    </Form>
  );
}
