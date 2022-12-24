import classNames from 'classnames';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { PlusOutlined } from '@ant-design/icons';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Col, Collapse, Form, Image as ImageAntd, Modal, Row, Tooltip, Upload } from 'antd';
import Slider from '@components//Slider';
import Admin from '@components//Layout/Admin';
import AppButton from '@components//AppButton';
import BackButton from '@components//BackButton';
import CreateFlowerForm from '@components//Form/CreateFlowerForm';
import { useDeleteFlower, useGetDetailFlower, useUpdateFlower } from 'hooks/flower';
import { formatNumber, getSrcFromFile } from 'utils/common';
import ModalConfirmFlower from '@components//pages/flower/ModalConfirm';
import showMessage from '@components//Message';
import { TYPE_MESSAGE } from 'constants/common';
import { WEB_URL } from 'constants/routes';
import dynamic from 'next/dynamic';
const ImgCrop = dynamic(import('antd-img-crop'), { ssr: false });

export default function DetailFlower() {
  const router = useRouter();
  const id = String(router.query.id);
  const { data, refetch } = useGetDetailFlower(id);
  const [form] = Form.useForm();
  const [listImage, setListImage] = useState<any>([]);
  const [isEdit, setisEdit] = useState(false);
  const [displayListThumbnail, setDisplayListThumbnail] = useState<boolean>(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
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
  const { mutate } = useDeleteFlower({
    id,
    onSuccess: () => {
      showMessage(TYPE_MESSAGE.SUCCESS, 'Xóa hoa thành công');
      setOpenModalDelete(false);
      router.push(WEB_URL.MANAGE_FLOWERS);
    },
  });
  const topicIds = data?.listTopics?.map((topic: any) => topic.id);
  const flowerInfo = { ...data?.flower, topicIds };

  const handleSubmitEdit = (values: any) => {
    setModalInfo({ ...values, thumbnail: data?.flower?.listImage[0]?.filePath || '' });
    setOpenModalUpdate(true);
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    const { topicIds: updateTopicIds, thumbnail, ...flowerInfo } = modalInfo;
    const topicsDel = topicIds?.filter((id: number) => !updateTopicIds?.includes(id));
    const topicsAdd = updateTopicIds?.filter((id: number) => !topicIds?.includes(id));
    topicsDel.forEach((topicId: number) => formData.append('topicsDel[]', String(topicId)));
    topicsAdd.forEach((topicId: number) => formData.append('topicsAdd[]', String(topicId)));
    
    Object.keys(flowerInfo).forEach((field: string) => flowerInfo[field] && formData.append(field, flowerInfo[field]));
    
    const listImageId = listImage?.filter((image: any) => !!image.url)?.map((image: any) => image.id);
    const newImages = listImage
      ?.filter((image: any) => !!image.originFileObj)
      ?.map((image: any) => image.originFileObj);
    listImageId?.forEach((imageId: string) => formData.append('listImage[]', imageId));
    for (let i = 0; i < newImages.length; i++) {
      formData.append('files', newImages[i]);
    }
    await updateFlower(formData);
  };
  const handleClickSave = () => {
    form.submit();
  };
  const handleClickEdit = () => {
    setisEdit(true);
  };
  const handlePreview = async (file: any) => {
    if (file.url) {
      window.open(file.url);
      return;
    }
    const src: any = await getSrcFromFile(file.originFileObj);
    const imgWindow = window.open(src);
    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
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
  const handleClickDeleteButton = () => {
    setOpenModalDelete(true);
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
          <AppButton text='Xóa hoa' variant='danger' onClick={handleClickDeleteButton} />
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
  const handleChangeListImage = (info: any) => {
    setListImage(info.fileList);
  };

  useEffect(() => {
    setListImage(
      data?.flower?.listImage?.map((srcImage: any, index: number) => ({
        uid: index - 1,
        url: srcImage.filePath,
        id: srcImage.id,
      })) || [],
    );
  }, [data]);

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
        <Col span={8}>
          <Row className='flower-detail__preview' onMouseEnter={showListThumbnail} onMouseLeave={hideListThumbnail}>
            {listImage[curThumbnail] && <ImageAntd src={listImage[curThumbnail].url} preview={false} />}
            <div
              className={classNames('flower-detail__preview__list-thumbnail', {
                show: displayListThumbnail,
              })}
            >
              <Slider curSlide={curThumbnail} setCurSlide={setCurThumbnail} lastSlide={listImage.length - 1}>
                {renderListImage()}
              </Slider>
            </div>
          </Row>
          <Row className='flower-detail__update-thumbnail'>
            <Collapse collapsible={isEdit ? 'header' : 'disabled'} activeKey={isEdit ? ['1'] : []}>
              <Collapse.Panel
                header={
                  <Tooltip title={isEdit ? '' : 'Nhấn chỉnh sửa để cập nhật danh sách ảnh hoa'}>
                    Cập nhật danh sách ảnh hoa
                  </Tooltip>
                }
                key='1'
              >
                <ImgCrop grid rotate>
                  <Upload
                    listType='picture-card'
                    accept='.jpg, .jpeg, .png, .gif'
                    multiple={true}
                    fileList={listImage}
                    onChange={handleChangeListImage}
                    onPreview={handlePreview}
                    showUploadList={{
                      showDownloadIcon: false,
                      showPreviewIcon: true,
                      showRemoveIcon: listImage.length > 1,
                    }}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Tải lên</div>
                    </div>
                  </Upload>
                </ImgCrop>
              </Collapse.Panel>
            </Collapse>
          </Row>
        </Col>
        <Col span={16}>
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
      <Modal open={openModalDelete} onCancel={() => setOpenModalDelete(false)} title='Xóa hoa' footer={null}>
        <h2>
          Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn xóa&nbsp;<strong>{flowerInfo.name}</strong>
          &nbsp;hay không?
        </h2>
        <Row className='modal-confirm-flower__buttons' gutter={24} justify='center'>
          <Col>
            <AppButton text='Hủy' variant='back' onClick={() => setOpenModalDelete(false)} />
          </Col>
          <Col>
            <AppButton text='Xóa' variant='danger' onClick={() => mutate()} />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

DetailFlower.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
