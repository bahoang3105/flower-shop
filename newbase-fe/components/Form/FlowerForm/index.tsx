import { Col, Form, Input, Row } from 'antd';
import Image from 'next/image';
import SearchIcon from 'public/svg/search.svg';
import InputNumber from '../FormItem/InputNumber';
import ResetButton from '../FormItem/ResetButton';

type PropsType = {
  setParams: any;
};

export const DEFAULT_SEARCH_PARAMS = {
  keyword: '',
  priceFrom: 0,
  priceTo: undefined,
};

export default function FlowerForm({ setParams }: PropsType) {
  const [form] = Form.useForm();

  const handleSearch = (values: any) => {
    setParams(values);
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
    <Form
      name='basic'
      initialValues={DEFAULT_SEARCH_PARAMS}
      form={form}
      onFinish={handleSearch}
      className='flower-form'
    >
      <Row gutter={16}>
        <Col span={10}>
          <Form.Item name='keyword'>
            <Input
              className='search-input'
              placeholder='Tìm kiếm theo tên hoa, ID'
              onKeyDown={handleKeyDown}
              prefix={
                <Image
                  src={SearchIcon}
                  height={16}
                  width={16}
                  alt=''
                />
              }
              autoComplete='off'
            />
          </Form.Item>
        </Col>
        <label style={{ marginTop: 5, marginLeft: 24 }}>Giá từ</label>
        <Col>
          <Form.Item name='priceFrom' className='flower-form__input-number'>
            <InputNumber
              numberDigitsAfter={0}
              value={form.getFieldValue('priceFrom')}
              handleChangeValue={(value: string) =>
                form.setFieldValue('priceFrom', value)
              }
              onKeyDown={handleKeyDown}
            />
          </Form.Item>
        </Col>
        <label style={{ marginTop: 5 }}>đến</label>
        <Col>
          <Form.Item name='price' className='flower-form__input-number'>
            <InputNumber
              numberDigitsAfter={0}
              value={form.getFieldValue('priceTo')}
              handleChangeValue={(value: string) =>
                form.setFieldValue('priceTo', value)
              }
              onKeyDown={handleKeyDown}
            />
          </Form.Item>
        </Col>
        <Col>
          <ResetButton
            className='account-guest-form__reset'
            onClick={handleResetForm}
          />
        </Col>
      </Row>
    </Form>
  );
}
