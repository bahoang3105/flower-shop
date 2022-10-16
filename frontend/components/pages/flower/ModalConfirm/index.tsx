import AppButton from '@components//AppButton';
import EllipsisText from '@components//EllipsisText';
import { Col, Image, Modal, Row, Tooltip } from 'antd';
import { Void } from 'constants/type';
import { formatNumber } from 'utils/common';

type PropsType = {
  open: boolean;
  onCancel: Void;
  title: string;
  thumbnail: string;
  name: string;
  price: number;
  size?: number;
  quantity?: number;
  description?: string;
  submitTitle: string;
  handleSubmit: Void;
};

export default function ModalConfirmFlower({
  open,
  title,
  thumbnail,
  name,
  price,
  size,
  quantity,
  description,
  onCancel,
  submitTitle,
  handleSubmit,
}: PropsType) {
  const infoList = [
    { label: 'Tên hoa', value: name },
    { label: 'Giá', value: formatNumber(price) + ' VND' },
    { label: 'Kích cỡ', value: size },
    { label: 'Số lượng', value: quantity ? formatNumber(quantity) : '' },
  ];
  const renderInfo = (label: string, value: string) => {
    if (value !== '' && value !== undefined) {
      return (
        <Row gutter={16} key={label} justify='space-between' className='modal-confirm-flower__row'>
          <Col className='modal-confirm-flower__label' span={8}>
            {label}
          </Col>
          <Col className='modal-confirm-flower__value' span={16}>
            {value}
          </Col>
        </Row>
      );
    }
  };
  return (
    <Modal open={open} onCancel={onCancel} footer={null} title={title} width={729}>
      <Row gutter={24}>
        <Col span={12}>
          <Image src={thumbnail} width='100%' />
        </Col>
        <Col span={12}>
          {infoList.map((info: any) => renderInfo(info.label, info.value))}
          <Tooltip title={description}>
            <Row className='modal-confirm-flower__description'>{description || 'Không có mô tả'}</Row>
          </Tooltip>
        </Col>
      </Row>
      <Row className='modal-confirm-flower__buttons' gutter={24} justify='center'>
        <Col>
          <AppButton text='Hủy' variant='back' onClick={onCancel} />
        </Col>
        <Col>
          <AppButton text={submitTitle} variant='primary' onClick={handleSubmit} />
        </Col>
      </Row>
    </Modal>
  );
}
