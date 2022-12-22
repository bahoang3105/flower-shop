import { Input } from 'antd';
import { FC } from 'react';

const InputNumber: FC<{
  placeholder?: string;
  value: string;
  handleChangeValue: any;
  numberDigitsBefore?: number;
  numberDigitsAfter?: number;
  autoComplete?: string;
}> = ({
  placeholder,
  value,
  handleChangeValue,
  numberDigitsBefore = 12,
  numberDigitsAfter = 3,
  autoComplete = 'off',
}) => {
  const listNumberKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const extensionKey = ['ArrowLeft', 'ArrowRight'];
  const backspace = 'Backspace';
  const dot = '.';

  const handleChange = (e: any) => {
    try {
      const value: string = e.target.value;
      const splitValue = value?.split(dot);
      const dotPosition = value?.indexOf(dot);
      if (value?.indexOf(dot) === 0) {
        handleChangeValue('0'.concat('.').concat(splitValue[1].substring(0, numberDigitsAfter)));
        return;
      }
      if (value?.startsWith('0') && !value?.startsWith('0.')) {
        handleChangeValue(Number(value));
        return;
      }
      if (splitValue?.length === 1) {
        const handledValue = value.substring(0, numberDigitsBefore);
        handleChangeValue(handledValue);
        return;
      } else {
        const handledValue = splitValue[0]
          .substring(0, dotPosition < numberDigitsBefore ? dotPosition : numberDigitsBefore)
          .concat('.')
          .concat(splitValue[1].substring(0, numberDigitsAfter));
        handleChangeValue(handledValue);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyDown = (e: any) => {
    try {
      const value = e.target.value;
      if (!listNumberKey.includes(e.key) && !extensionKey.includes(e.key) && e.key !== backspace && e.key !== dot) {
        e.preventDefault();
      }
      if (listNumberKey.includes(e.key)) {
      }
      if (e.key === dot) {
        if (value?.indexOf(dot) > -1 || numberDigitsAfter === 0) {
          e.preventDefault();
        }
      }
    } catch (error) {
      console.error(e);
    }
  };
  const handleBlur = (e: any) => {
    try {
      const value = e.target.value;
      handleChangeValue(value ? (isNaN(Number(value)) ? '' : Number(value)) : '');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Input
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      autoComplete={autoComplete}
    />
  );
};

export default InputNumber;
