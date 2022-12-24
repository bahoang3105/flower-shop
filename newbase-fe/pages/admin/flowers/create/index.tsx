import classNames from 'classnames';
import { useRouter } from 'next/router';
import NextImage from 'next/image';
import { PlusOutlined } from '@ant-design/icons';
import { ReactElement, useMemo, useRef, useState } from 'react';
import { Col, Form, Image as AntdImage, Row, Upload } from 'antd';
import Admin from '@components//Layout/Admin';
import AppButton from '@components//AppButton';
import showMessage from '@components//Message';
import BackButton from '@components//BackButton';
import CreateFlowerForm from '@components//Form/CreateFlowerForm';
import ModalConfirmFlower from '@components//pages/flower/ModalConfirm';
import ImageSvg from 'public/svg';
import { formatNumber, getSrcFromFile } from 'utils/common';
import { useCreateFlower } from 'hooks/flower';
import { WEB_URL } from 'constants/routes';
import { TYPE_MESSAGE } from 'constants/common';
import dynamic from 'next/dynamic';
const ImgCrop = dynamic(import('antd-img-crop'), { ssr: false });

const INITIAL_VALUES = {
  name: '',
  description: '',
  size: undefined,
  price: undefined,
  flowerThumbnail: undefined,
  quantity: undefined,
  topicIds: [],
};

export default function CreateFlower() {
  const [form] = Form.useForm();
  const name = Form.useWatch('name', form);
  const price = Form.useWatch('price', form);
  const [open, setOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [errorThumbnail, setErrorThumbnail] = useState(false);
  const [listImage, setListImage] = useState<any>([]);
  const uploadRef = useRef<any>();
  const router = useRouter();
  const { mutateAsync: createFlower } = useCreateFlower({
    onSuccess: () => {
      showMessage(TYPE_MESSAGE.SUCCESS, 'Thêm mới hoa thành công');
      setOpen(false);
      router.push(WEB_URL.MANAGE_FLOWERS);
    },
  });
  const previewThumbnail = useMemo(() => {
    if (!thumbnail) return '';
    return URL.createObjectURL(thumbnail.originFileObj);
  }, [thumbnail]);

  const handleSubmit = () => {
    if (!thumbnail) {
      setErrorThumbnail(true);
    } else {
      setErrorThumbnail(false);
      const fieldErrorIndex = form.getFieldsError().findIndex((field) => field.errors.length > 0);
      if (fieldErrorIndex < 0) {
        setOpen(true);
      }
    }
  };
  const handleCreateFlower = async () => {
    if (!thumbnail) {
      setErrorThumbnail(true);
    } else {
      setErrorThumbnail(false);
      const { topicIds, ...info } = form.getFieldsValue();
      const formData = new FormData();
      const imageFiles = listImage.map((image: any) => image.originFileObj);
      const files = [thumbnail.originFileObj, ...imageFiles];
      const listKey = Object.keys(info);
      files?.forEach((file: File) => formData.append('files', file));
      topicIds?.forEach((topicId: number) => formData.append('topicIds[]', String(topicId)));
      listKey?.forEach((key: string) => {
        if (info[key] !== undefined) {
          formData.append(key, String(info[key]));
        }
      });
      await createFlower(formData);
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
      const image: any = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
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
                    <NextImage
                      className='create-flower-form__thumbnail__upload-icon'
                      src={ImageSvg.upload}
                      width={120}
                      height={87.32}
                      alt=''
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
                <ImgCrop grid rotate aspect={2/3}>
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
              <label style={{ lineHeight: '32px' }}>Một số ảnh khác</label>
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
          <CreateFlowerForm form={form} initialValues={INITIAL_VALUES} onFinish={handleSubmit} />
          <AppButton text='Thêm mới' variant='primary' onClick={form.submit} />
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
                    <NextImage src={ImageSvg.previewImage} height={37} width={64} alt='' />
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
      <ModalConfirmFlower
        title='Xác nhận thông tin hoa'
        submitTitle='Thêm mới'
        {...form.getFieldsValue()}
        open={open}
        onCancel={() => setOpen(false)}
        thumbnail={previewThumbnail}
        handleSubmit={handleCreateFlower}
      />
    </div>
  );
}

CreateFlower.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
