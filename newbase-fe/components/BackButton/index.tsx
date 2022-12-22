import { LeftOutlined } from '@ant-design/icons';
import { Col } from 'antd';
import { useRouter } from 'next/router';
import AppButton from '../AppButton';

export default function BackButton({ offset = 0, onClick }: { offset?: number; onClick?: any }) {
  const router = useRouter();
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };
  return (
    <Col offset={offset}>
      <AppButton text='Trở lại' variant='back' onClick={handleClick} prefixIcon={<LeftOutlined />} />
    </Col>
  );
}
