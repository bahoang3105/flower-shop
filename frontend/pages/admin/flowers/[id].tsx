import classNames from 'classnames';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { ReactElement, useMemo, useState } from 'react';
import { Col, Form, Image as ImageAntd, Row } from 'antd';
import Slider from '@components//Slider';
import Admin from '@components//Layout/Admin';
import AppButton from '@components//AppButton';
import BackButton from '@components//BackButton';
import withServerSideProps from 'hoc/withServerSideProps';
import CreateFlowerForm from '@components//Form/CreateFlowerForm';
import { useGetDetailFlower, useUpdateFlower } from 'hooks/flower';
import { formatNumber, getSrcFromFile } from 'utils/common';
import ModalConfirmFlower from '@components//pages/flower/ModalConfirm';
import showMessage from '@components//Message';
import { TYPE_MESSAGE } from 'constants/common';

export default function DetailFlower() {
  const router = useRouter();
  const id = String(router.query.id);
  const { data, refetch } = useGetDetailFlower(id);
  const [form] = Form.useForm();
  const [isEdit, setisEdit] = useState(false);
  const [displayListThumbnail, setDisplayListThumbnail] = useState<boolean>(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [modalInfo, setModalInfo] = useState<any>({ thumbnail: '', name: '', price: 0 });
  const [curThumbnail, setCurThumbnail] = useState<number>(0);
  const { mutateAsync: updateFlower } = useUpdateFlower({
    id,
    onSuccess: () => {
      refetch();
      setisEdit(false);
      setOpenModalUpdate(false);
      showMessage(TYPE_MESSAGE.SUCCESS, 'Cập nhật thành công');
    },
  });
  const listImage = useMemo(() => {
    return data?.flower?.listImage?.map((srcImage: string, index: number) => ({ uid: index - 1, url: srcImage })) || [];
  }, [data]);
  const topicIds = useMemo(() => {
    return data?.listTopics?.map((topic: any) => topic.id);
  }, [data]);
  const flowerInfo = useMemo(() => {
    return { ...data?.flower, topicIds };
  }, [data]);

  const handleSubmitEdit = (values: any) => {
    setModalInfo({ ...values, thumbnail: data?.flower?.listImage[0] || '' });
    setOpenModalUpdate(true);
  };
  const handleSubmit = async () => {
    const { topicIds: updateTopicIds } = modalInfo;
    const topicsDel = topicIds?.filter((id: number) => !updateTopicIds?.includes(id));
    const topicsAdd = updateTopicIds?.filter((id: number) => !topicIds?.includes(id));
    await updateFlower({ ...modalInfo, topicsDel, topicsAdd });
  };
  const handleClickSave = () => {
    form.submit();
  };
  const handleClickEdit = () => {
    setisEdit(true);
  };
  const handleClickCancleEdit = () => {
    setisEdit(false);
    form.setFieldsValue(flowerInfo);
  };
  const selectThumbnail = (index: number) => {
    setCurThumbnail(index);
  };
  const showListThumbnail = () => {
    setDisplayListThumbnail(true);
  };
  const hideListThumbnail = () => {
    setDisplayListThumbnail(false);
  };
  const renderButtons = () => {
    if (isEdit) {
      return (
        <>
          <AppButton text='Lưu' variant='primary' onClick={handleClickSave} />
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
  const renderListImage = () => {
    return listImage?.map((item: any, index: number) => (
      <div key={item.uid} onClick={() => selectThumbnail(index)}>
        <ImageAntd src={item.url} height={44} width={44} alt='' preview={false} />
      </div>
    ));
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
      <Row gutter={40}>
        <Col span={12}>
          <Row className='flower-detail__preview' onMouseEnter={showListThumbnail} onMouseLeave={hideListThumbnail}>
            {listImage[curThumbnail] && <ImageAntd src={listImage[curThumbnail].url} preview={false} />}
            <div
              className={classNames('flower-detail__preview__list-thumbnail', {
                show: displayListThumbnail,
              })}
            >
              <Slider curSlide={curThumbnail} setCurSlide={setCurThumbnail} lastSlide={listImage.length}>
                {renderListImage()}
              </Slider>
            </div>
          </Row>
          <Row></Row>
        </Col>
        <Col span={12}>
          <div className='flower-detail__id'>#{formatNumber(Number(id))}</div>
          {data?.flower && (
            <CreateFlowerForm form={form} disabled={!isEdit} onFinish={handleSubmitEdit} initialValues={flowerInfo} />
          )}
        </Col>
      </Row>
      <ModalConfirmFlower
        open={openModalUpdate}
        onCancel={() => setOpenModalUpdate(false)}
        title='Cập nhật thông tin hoa'
        submitTitle='Cập nhật'
        handleSubmit={handleSubmit}
        {...modalInfo}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

DetailFlower.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
