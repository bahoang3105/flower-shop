import classNames from 'classnames';
import { GetServerSideProps } from 'next';
import { ReactElement, useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Col, Form, Image, Input, Row, Select, Upload } from 'antd';
import Admin from '@components//Layout/Admin';
import AppButton from '@components//AppButton';
import BackButton from '@components//BackButton';
import withServerSideProps from 'hoc/withServerSideProps';
import InputNumber from '@components//Form/FormItem/InputNumber';
import ImageSvg from 'public/svg';
import { formatNumber } from 'utils/common';

const INITIAL_VALUES = {
  name: '',
  description: '',
  size: undefined,
  price: undefined,
  flowerThumbnail: undefined,
  quantity: undefined,
};
export const SIZE_OPTIONS = [
  { value: 1, label: 'Small' },
  { value: 2, label: 'Medium' },
  { value: 3, label: 'Big' },
];

export default function CreateFlower() {
  const [form] = Form.useForm();
  const name = Form.useWatch('name', form);
  const price = Form.useWatch('price', form);
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [errorThumbnail, setErrorThumbnail] = useState(false);
  const [listImage, setListImage] = useState<any>([]);
  const previewThumbnail = useMemo(() => {
    if (!thumbnail) return '';
    return URL.createObjectURL(thumbnail);
  }, [thumbnail]);

  const handleSubmit = (values: any) => {
    if (!thumbnail) {
      setErrorThumbnail(true);
    } else {
      setErrorThumbnail(false);
    }
    console.log(values);
  };
  const handleCreateFlower = () => {
    form.submit();
    if (!thumbnail) {
      setErrorThumbnail(true);
    } else {
      setErrorThumbnail(false);
    }
  };
  const handleClickFile = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    (e.target as any).value = null;
  };
  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setThumbnail(fileList[0]);
    }
  };
  const handleChangeListImage = (info: any) => {
    setListImage(info.fileList);
  };
  const handlePreview = async (file: any) => {
    return window.URL.createObjectURL(file);
  };

  return (
    <div style={{ paddingTop: 32, paddingBottom: 32 }}>
      <BackButton />
      <h1>Thêm mới hoa</h1>
      <Row gutter={24}>
        <Col span={16}>
          <Form
            name='basic'
            className='create-flower-form'
            form={form}
            initialValues={INITIAL_VALUES}
            onFinish={handleSubmit}
          >
            <Row gutter={24}>
              <Col span={24}>
                <label>Ảnh đại diện của hoa *</label>
                <div className='create-flower-form__thumbnail'>
                  {!thumbnail && (
                    <>
                      <Image
                        wrapperClassName='create-flower-form__thumbnail__upload-icon'
                        src={ImageSvg.upload}
                        width={120}
                        height={87.32}
                        preview={false}
                      />
                      <p>
                        Tải lên <strong>JPG, JPEG, PNG, GIF</strong> file. Kích thước tối đa&nbsp;
                        {process.env.NEXT_PUBLIC_MAX_SIZE_FILE}MB.
                      </p>
                    </>
                  )}
                  <label htmlFor='upload-thumbnail'>
                    {thumbnail ? (
                      <div className='create-flower-form__thumbnail__preview'>
                        <Image src={previewThumbnail} preview={false} />
                        <div className='overlay center-flex-item'>+</div>
                      </div>
                    ) : (
                      <div className={classNames('button', 'button--primary', 'ant-btn', 'ant-btn-default')}>
                        <span>Tải lên</span>
                      </div>
                    )}
                    <input
                      id='upload-thumbnail'
                      onChange={handleSelectFile}
                      accept='.jpg, .jpeg, .png, .gif'
                      onClick={handleClickFile}
                      multiple={false}
                      type='file'
                      className='create-flower-form__thumbnail__input'
                    />
                  </label>
                </div>
                {errorThumbnail && (
                  <div className='error' style={{ marginTop: -24, marginBottom: 24 }}>
                    Vui lòng tải lên ảnh đại diện cho hoa
                  </div>
                )}
              </Col>
              <Col span={24} style={{ marginBottom: 20 }}>
                <label>Một số ảnh khác</label>
                <Upload
                  listType='picture-card'
                  multiple={true}
                  fileList={listImage}
                  onChange={handleChangeListImage}
                  previewFile={handlePreview}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Tải lên</div>
                  </div>
                </Upload>
              </Col>
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
                  <Select mode='multiple' placeholder='Phân loại hoa'></Select>
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
          <AppButton text='Thêm mới' variant='primary' onClick={handleCreateFlower} />
        </Col>
        <Col span={8} className='create-flower-preview'>
          <section>
            <label>Xem trước</label>
            <div className='create-flower-preview__border'>
              <div className='create-flower-preview__image'>
                {thumbnail ? (
                  <Image className='create-flower-preview__image__img' src={previewThumbnail} preview={false} />
                ) : (
                  <>
                    <Image src={ImageSvg.previewImage} height={37} width={64} preview={false} />
                    <div className='create-flower-preview__image__notice'>Hãy tải ảnh đại diện để xem trước</div>
                  </>
                )}
              </div>
              <div className='create-flower-preview__name'>{name}</div>
              <div className='create-flower-preview__price'>{price && formatNumber(price) + ' VND'}</div>
            </div>
          </section>
        </Col>
      </Row>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

CreateFlower.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
