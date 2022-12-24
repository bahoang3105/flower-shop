import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { Col, Form, Image, Input, Modal, Row } from 'antd';
import Admin from '@components//Layout/Admin';
import AppButton from '@components//AppButton';
import BackButton from '@components//BackButton';
import { useGetFlowers } from 'hooks/flower';
import { formatNumber } from 'utils/common';
import showMessage from '@components//Message';
import { TYPE_MESSAGE } from 'constants/common';
import { WEB_URL } from 'constants/routes';
import { useDeleteTopic, useGetDetailTopic, useUpdateTopic } from 'hooks/topic';
import Link from 'next/link';

export default function DetailTopic() {
  const router = useRouter();
  const id = String(router.query.id);
  const { data, refetch } = useGetDetailTopic(id);
  const [form] = Form.useForm();
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const { data: listFlower } = useGetFlowers({ params: { limit: 1000000, page: 1, topicIds: [id] } });

  const { mutateAsync: updateTopic } = useUpdateTopic({
    id,
    onSuccess: () => {
      refetch();
      setOpenModalDelete(false);
      setOpenModalUpdate(false);
      showMessage(TYPE_MESSAGE.SUCCESS, 'Cập nhật thành công');
    },
  });
  const { mutate: deleteTopic } = useDeleteTopic({
    id,
    onSuccess: () => {
      showMessage(TYPE_MESSAGE.SUCCESS, 'Xóa loại hoa thành công');
      setOpenModalDelete(false);
      router.push(WEB_URL.MANAGE_TOPICS);
    },
  });
  const handleClickEdit = () => {
    setOpenModalUpdate(true);
  };
  const handleClickDeleteButton = () => {
    setOpenModalDelete(true);
  };

  return (
    <div className='flower-detail'>
      <Row justify='space-between'>
        <Col>
          <BackButton />
        </Col>
        <Col className='flower-detail__buttons'>
          <AppButton text='Chỉnh sửa' variant='secondary' onClick={handleClickEdit} />
          <AppButton text='Xóa loại hoa' variant='danger' onClick={handleClickDeleteButton} />
        </Col>
      </Row>
      <div className='flower-detail__id'>#{formatNumber(Number(id))}</div>
      <h1>{data?.name}</h1>
      <h4>Mô tả: {data?.description || 'Không có mô tả'}</h4>
      <h3>Danh sách hoa</h3>
      <div className='recommend-product'>
        <Row className='recommend-product__list'>
          {listFlower?.items?.map((item: any) => {
            const { listImage, name, price, id } = item || {};
            return (
              <Col
                key={id}
                style={{ paddingLeft: 0 }}
                className='recommend-product__list__item'
                xs={24}
                sm={12}
                md={6}
                xl={4}
              >
                <Link
                  href={{
                    pathname: WEB_URL.MANAGE_FLOWERS + '/' + id,
                  }}
                >
                  <div className='recommend-product__list__item__thumbnail-img' style={{ paddingTop: '0%' }}>
                    <Image src={listImage[0].filePath} alt='' preview={false} />
                  </div>
                  <div className='recommend-product__list__item__name centrelize-text'>{name}</div>
                  <div className='recommend-product__list__item__price centrelize-text'>
                    {formatNumber(price)} VND
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
      <Modal
        open={openModalUpdate}
        onCancel={() => setOpenModalUpdate(false)}
        title='Cập nhật thông tin loại hoa'
        footer={null}
        width={749}
      >
        <Form
          name='basic'
          className='create-flower-form'
          form={form}
          initialValues={data}
          onFinish={updateTopic}
          disabled={false}
        >
          <Col span={24}>
            <label>Tên loại hoa *</label>
            <Form.Item name='name' rules={[{ required: true, message: 'Vui lòng nhập tên hoa' }]}>
              <Input placeholder='Tên loại hoa' autoComplete='off' maxLength={512} />
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
        <AppButton text='Cập nhật' variant='secondary' onClick={form.submit} />
      </Modal>
      <Modal open={openModalDelete} onCancel={() => setOpenModalDelete(false)} title='Xóa loại hoa' footer={null}>
        <h2>
          Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn xóa&nbsp;<strong>{data?.name}</strong>
          &nbsp;hay không?
        </h2>
        <Row className='modal-confirm-flower__buttons' gutter={24} justify='center'>
          <Col>
            <AppButton text='Hủy' variant='back' onClick={() => setOpenModalDelete(false)} />
          </Col>
          <Col>
            <AppButton text='Xóa' variant='danger' onClick={() => deleteTopic()} />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

DetailTopic.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};
