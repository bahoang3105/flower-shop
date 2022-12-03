import { Input } from 'antd';
import { Void } from 'constants/type';
import { ChangeEvent, ReactNode } from 'react';

type PropsType = {
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  onPressEnter?: Void;
  prefix?: ReactNode | string;
};

export default function TextInput({
  disabled = false,
  value,
  onChange,
  className,
  placeholder = '',
  ...props
}: PropsType) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <Input
      className={className}
      disabled={disabled}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      {...props}
    />
  );
}
