import { DatePicker } from 'antd';
import Image from 'next/image';
import DatePickerIcon from 'public/svg/date-picker.svg';
import { DATE_FORMAT } from 'constants/common';

type PropsType = {
  className?: string;
  placeholder?: string;
  disabledDate: any;
  onChange: any;
};

export default function DatePickerInput({ className, placeholder, disabledDate, onChange }: PropsType) {
  const suffixIcon = <Image src={DatePickerIcon} height={16.67} width={16.67} alt='' />;

  return (
    <DatePicker
      format={DATE_FORMAT.DATE_MONTH_YEAR}
      className={className}
      placeholder={placeholder}
      inputReadOnly={true}
      suffixIcon={suffixIcon}
      disabledDate={disabledDate}
      onChange={onChange}
    />
  );
}
