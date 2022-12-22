import { Col, Row } from 'antd';
import { ReactNode } from 'react';
import TextInput from '../TextInput';

type PropsType = {
  label: string | ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  labelWidth?: number;
  inputWidth?: number;
};

export default function TextInputWithLabel({ label, labelWidth = 3, inputWidth = 12, ...inputProps }: PropsType) {
  return (
    <Row>
      <Col span={labelWidth}>
        <label>{label}</label>
      </Col>
      <Col span={inputWidth}>
        <TextInput {...inputProps} />
      </Col>
    </Row>
  );
}
