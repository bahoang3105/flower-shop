import classNames from 'classnames';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { PlusOutlined } from '@ant-design/icons';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Col, Form, Image as AntdImage, Input, Row, Select, Upload } from 'antd';
import Admin from '@components//Layout/Admin';
import AppButton from '@components//AppButton';
import showMessage from '@components//Message';
import BackButton from '@components//BackButton';
import withServerSideProps from 'hoc/withServerSideProps';
import InputNumber from '@components//Form/FormItem/InputNumber';
import ImageSvg from 'public/svg';
import { formatNumber } from 'utils/common';
import { useGetTopics } from 'hooks/topic';
import { useCreateFlower } from 'hooks/flower';
import { WEB_URL } from 'constants/routes';
import { TYPE_MESSAGE } from 'constants/common';

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
const getSrcFromFile = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });
};

export default function CreateFlower() {
  const [form] = Form.useForm();
  const name = Form.useWatch('name', form);
  const price = Form.useWatch('price', form);
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [errorThumbnail, setErrorThumbnail] = useState(false);
  const [searchTopic, setSearchTopic] = useState('');
  const [listImage, setListImage] = useState<any>([]);
  const { data: topicList } = useGetTopics({
    params: { keyword: searchTopic, limit: 20, page: 1, flowersPerTopic: 0 },
  });
  const uploadRef = useRef<any>();
  const router = useRouter();
  const { mutateAsync: createFlower } = useCreateFlower({
    onSuccess: () => {
      showMessage(TYPE_MESSAGE.SUCCESS, 'Thêm mới hoa thành công');
      router.push(WEB_URL.MANAGE_FLOWERS);
    },
  });
  const previewThumbnail = useMemo(() => {
    if (!thumbnail) return '';
    return URL.createObjectURL(thumbnail.originFileObj);
  }, [thumbnail]);

  const handleSubmit = async (values: any) => {
    if (!thumbnail) {
      setErrorThumbnail(true);
    } else {
      setErrorThumbnail(false);
      const { topicIds, ...info } = values;
      const formData = new FormData();
      const imageFiles = listImage.map((image: any) => image.originFileObj);
      const files = [thumbnail, ...imageFiles];
      const listKey = Object.keys(info);
      files?.forEach((file: File) => formData.append('files', file));
      topicIds?.forEach((topicId: number) => formData.append('topicIds', String(topicId)));
      listKey?.forEach((key: string) => {
        if (info[key] !== undefined) {
          formData.append(key, String(info[key]));
        }
      });
      const res = await createFlower(formData);
      console.log(res);
    }
  };
  const handleCreateFlower = () => {
    form.submit();
    if (!thumbnail) {
      setErrorThumbnail(true);
    } else {
      setErrorThumbnail(false);
    }
  };
  const handleChangeThumbnail = (info: any) => {
    setThumbnail(info.fileList.at(-1));
  };
  const handleChangeListImage = (info: any) => {
    setListImage(info.fileList);
  };
  const handlePreview = async (file: any) => {
    const src: any = await getSrcFromFile(file);
    const imgWindow = window.open(src);
    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
    return window.URL.createObjectURL(file);
  };
  const handleSearchTopic = (value: string) => {
    setSearchTopic(value);
  };
  const click = () => {
    uploadRef.current.click();
  };

  return (
    <div style={{ paddingTop: 32, paddingBottom: 32 }}>
      <BackButton />
      <h1>Thêm mới hoa</h1>
      <Row gutter={24}>
        <Col xxl={18} xl={17} lg={16}>
          <Row gutter={24}>
            <Col span={24}>
              <label>Ảnh đại diện của hoa *</label>
              <div className='create-flower-form__thumbnail'>
                {!thumbnail && (
                  <>
                    <AntdImage
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
                {thumbnail ? (
                  <div className='create-flower-form__thumbnail__preview' onClick={click}>
                    <AntdImage src={previewThumbnail} preview={false} />
                    <div className='overlay center-flex-item'>+</div>
                  </div>
                ) : (
                  <div
                    onClick={click}
                    className={classNames('button', 'button--primary', 'ant-btn', 'ant-btn-default')}
                  >
                    <span>Tải lên</span>
                  </div>
                )}
                <ImgCrop grid rotate>
                  <Upload
                    className='create-flower-form__thumbnail__upload'
                    listType='picture-card'
                    accept='.jpg, .jpeg, .png, .gif'
                    multiple={true}
                    fileList={thumbnail ? [thumbnail] : []}
                    onChange={handleChangeThumbnail}
                    onPreview={({ originFileObj }) => handlePreview(originFileObj)}
                  >
                    <div ref={uploadRef} />
                  </Upload>
                </ImgCrop>
              </div>
              {errorThumbnail && (
                <div className='error' style={{ marginTop: -24, marginBottom: 24 }}>
                  Vui lòng tải lên ảnh đại diện cho hoa
                </div>
              )}
            </Col>
            <Col span={24} style={{ marginBottom: 20 }}>
              <label>Một số ảnh khác</label>
              <ImgCrop grid rotate>
                <Upload
                  listType='picture-card'
                  accept='.jpg, .jpeg, .png, .gif'
                  multiple={true}
                  fileList={listImage}
                  onChange={handleChangeListImage}
                  onPreview={({ originFileObj }) => handlePreview(originFileObj)}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Tải lên</div>
                  </div>
                </Upload>
              </ImgCrop>
            </Col>
          </Row>
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
          <AppButton text='Thêm mới' variant='primary' onClick={handleCreateFlower} />
        </Col>
        <Col xxl={6} xl={7} lg={8} className='create-flower-preview'>
          <section>
            <label>Xem trước</label>
            <div className='create-flower-preview__border'>
              <div className='create-flower-preview__image'>
                <div id='dummy'></div>
                {thumbnail ? (
                  <AntdImage rootClassName='create-flower-preview__image__img' src={previewThumbnail} preview={false} />
                ) : (
                  <div className='create-flower-preview__image__default'>
                    <AntdImage src={ImageSvg.previewImage} height={37} width={64} preview={false} />
                    <div className='create-flower-preview__image__notice'>Hãy tải ảnh đại diện để xem trước</div>
                  </div>
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
