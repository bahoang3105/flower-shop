import AppButton from '@components//AppButton';
import BackButton from '@components//BackButton';
import { PlusOutlined } from '@ant-design/icons';
import CreateFlowerForm from '@components//Form/CreateFlowerForm';
import Admin from '@components//Layout/Admin';
import { Col, Form, Row, Upload } from 'antd';
import withServerSideProps from 'hoc/withServerSideProps';
import { useGetDetailFlower } from 'hooks/flower';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useMemo, useState } from 'react';
import { formatNumber, getSrcFromFile } from 'utils/common';
import Slider from '@components//Slider';

export default function DetailFlower() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetDetailFlower(String(id));
  const [form] = Form.useForm();
  const [isEdit, setisEdit] = useState(false);
  const listImage = useMemo(() => {
    return data?.flower?.listImage?.map((srcImage: string, index: number) => ({ uid: index - 1, url: srcImage })) || [];
  }, [data]);
  const flowerInfo = useMemo(() => {
    return { ...data?.flower, topicIds: data?.listTopics };
  }, [data]);

  const handleSubmitEdit = (values: any) => {
    console.log(values);
  };
  const handleClickEdit = () => {
    setisEdit(true);
  };
  const handleChangeListImage = () => {};
  const handlePreview = async (file: any) => {
    if (file.url) {
      window.open(file.url, '_blank');
    } else {
      const src: any = await getSrcFromFile(file.originFileObj);
      const imgWindow = window.open(src);
      if (imgWindow) {
        const image = new Image();
        image.src = src;
        imgWindow.document.write(image.outerHTML);
      } else {
        window.location.href = src;
      }
    }
  };
  const handleClickCancleEdit = () => {
    setisEdit(false);
    form.setFieldsValue(flowerInfo);
  };
  const renderButtons = () => {
    if (isEdit) {
      return (
        <>
          <AppButton text='Lưu' variant='primary' />
          <AppButton text='Hủy' variant='back' onClick={handleClickCancleEdit} />
        </>
      );
    } else {
      return (
        <>
          <AppButton text='Chỉnh sửa' variant='secondary' onClick={handleClickEdit} />
          <AppButton text='Xóa hoa' variant='danger' />
        </>
      );
    }
  };

  return (
    <div className='flower-detail'>
      <Row justify='space-between'>
        <Col>
          <BackButton />
        </Col>
        <Col className='flower-detail__buttons'>{renderButtons()}</Col>
      </Row>
      <br />
      <Row>
        <Col span={12}>
          <Upload
            listType='picture-card'
            accept='.jpg, .jpeg, .png, .gif'
            multiple={true}
            fileList={listImage}
            onChange={handleChangeListImage}
            onPreview={handlePreview}
            disabled={!isEdit}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải lên</div>
            </div>
          </Upload>
        </Col>
        <Col span={12}>
          <div className='flower-detail__id'>#{formatNumber(Number(id))}</div>
          {data?.flower && (
            <CreateFlowerForm form={form} disabled={!isEdit} onFinish={handleSubmitEdit} initialValues={flowerInfo} />
          )}
        </Col>
      </Row>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

DetailFlower.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
