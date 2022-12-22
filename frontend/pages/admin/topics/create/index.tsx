import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { ReactElement, useState } from 'react';
import { Col, Form, Input, Image as AntdImage, Row, Select, Modal } from 'antd';
import Admin from '@components//Layout/Admin';
import AppButton from '@components//AppButton';
import showMessage from '@components//Message';
import BackButton from '@components//BackButton';
import withServerSideProps from 'hoc/withServerSideProps';
import { useGetFlowers } from 'hooks/flower';
import { WEB_URL } from 'constants/routes';
import { TYPE_MESSAGE } from 'constants/common';
import { useCreateTopic } from 'hooks/topic';

const INITIAL_VALUES = {
  name: '',
  description: '',
  flowerIds: [],
};

export default function CreateTopic() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: flowerList } = useGetFlowers({ params: { limit: 1000000, page: 1 } });

  const { mutateAsync: createTopic } = useCreateTopic({
    onSuccess: () => {
      showMessage(TYPE_MESSAGE.SUCCESS, 'Thêm mới loại hoa thành công');
      setOpen(false);
      router.push(WEB_URL.MANAGE_TOPICS);
    },
  });

  const handleSubmit = async () => {
    const fieldErrorIndex = form.getFieldsError().findIndex((field) => field.errors.length > 0);
    if (fieldErrorIndex < 0) {
      setOpen(true);
    }
  };
  const handleCreateTopic = async () => {
    const params = form.getFieldsValue();
    await createTopic(params);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div style={{ paddingTop: 32, paddingBottom: 32 }}>
      <BackButton />
      <h1>Thêm mới loại hoa</h1>
      <Row>
        <Col xxl={18} xl={17} lg={16}>
          <Form
            name='basic'
            className='create-flower-form'
            form={form}
            initialValues={INITIAL_VALUES}
            onFinish={handleSubmit}
            disabled={false}
          >
            <Col span={24}>
              <label>Tên loại hoa *</label>
              <Form.Item name='name' rules={[{ required: true, message: 'Vui lòng nhập tên hoa' }]}>
                <Input placeholder='Tên loại hoa' autoComplete='off' maxLength={512} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <label>Danh sách hoa</label>
              <Form.Item name='topicIds'>
                <Select mode='multiple' className='topic-form' placeholder='Danh sách hoa'>
                  {flowerList?.items?.map((flower: any) => (
                    <Select.Option key={flower.id} value={flower.id}>
                      <AntdImage
                        src={flower.listImage?.[0].filePath}
                        alt='avatar'
                        preview={false}
                        height={50}
                        width={50}
                      />
                      <span style={{ marginLeft: 12 }}>{flower.name}</span>
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
                  placeholder='Hãy viết một số mô tả về loại hoa. Tối đa 2000 kí tự.'
                  maxLength={2000}
                  showCount={true}
                />
              </Form.Item>
            </Col>
          </Form>
          <AppButton text='Thêm mới' variant='primary' onClick={form.submit} />
        </Col>
      </Row>
      <Modal open={open} onCancel={handleCancel} title='Xác nhận thêm loại hoa' footer={null} width={500}>
        <Row style={{ fontSize: 20 }}>Bạn đã chắc chắn thêm loại hoa này chưa?</Row>
        <Row className='modal-confirm-flower__buttons' gutter={24} justify='center'>
          <Col>
            <AppButton text='Hủy' variant='back' onClick={handleCancel} />
          </Col>
          <Col>
            <AppButton text={'Thêm mới'} variant='primary' onClick={handleCreateTopic} />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

CreateTopic.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
