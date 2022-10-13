import { Col, Form, Input, Row, Select } from 'antd';
import InputNumber from '../FormItem/InputNumber';

export const SIZE_OPTIONS = [
  { value: 1, label: 'Small' },
  { value: 2, label: 'Medium' },
  { value: 3, label: 'Big' },
];

export default function CreateFlowerForm() {
  return (
    <Form
      name='basic'
      className='create-flower-form'
      form={form}
      initialValues={INITIAL_VALUES}
      onFinish={handleSubmit}
    >
      <Row>
        <Col span={12}>
          <label>Tên hoa *</label>
          <Form.Item name='name' rules={[{ required: true, message: 'Vui lòng nhập tên hoa' }]}>
            <Input placeholder='Tên hoa' autoComplete='off' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <label>Kích cỡ</label>
          <Form.Item name='size'>
            <Select placeholder='Kích cỡ hoa'>
              {SIZE_OPTIONS.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <label>Giá *</label>
          <Form.Item name='price' rules={[{ required: true, message: 'Vui lòng nhập giá hoa' }]}>
            <InputNumber
              placeholder='Giá hoa'
              numberDigitsAfter={0}
              value={form.getFieldValue('price')}
              handleChangeValue={(value: string) => form.setFieldValue('price', value)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <label>Số lượng</label>
          <Form.Item name='quantity'>
            <InputNumber
              placeholder='Số lượng hoa'
              numberDigitsAfter={0}
              numberDigitsBefore={6}
              value={form.getFieldValue('quantity')}
              handleChangeValue={(value: string) => form.setFieldValue('quantity', value)}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <label>Phân loại hoa</label>
          <Form.Item name='topicIds'>
            <Select
              mode='multiple'
              placeholder='Phân loại hoa'
              searchValue={searchTopic}
              onSearch={handleSearchTopic}
              filterOption={() => true}
            >
              {topicList?.data?.map((topic: any) => (
                <Select.Option key={topic.id} value={topic.id}>
                  {topic.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <label>Mô tả</label>
          <Form.Item name='description'>
            <Input.TextArea
              rows={6}
              placeholder='Hãy viết một số mô tả về hoa. Tối đa 2000 kí tự.'
              maxLength={2000}
              showCount={true}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
