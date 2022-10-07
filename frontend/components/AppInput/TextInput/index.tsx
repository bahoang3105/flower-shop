import { Input } from 'antd';
import classNames from 'classnames';
import { ChangeEvent } from 'react';

type PropsType = {
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
};

export default function TextInput({ disabled = false, value, onChange, className, placeholder = '' }: PropsType) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <Input
      className={classNames({ className })}
      disabled={disabled}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}
