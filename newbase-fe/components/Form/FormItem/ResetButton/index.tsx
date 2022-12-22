import Image from 'next/image';
import classNames from 'classnames';
import { Void } from 'constants/type';
import ReloadIcon from 'public/svg/reload.svg';

type PropsType = {
  onClick: Void;
  className?: string;
};

export default function ResetButton({ className, onClick }: PropsType) {
  return (
    <Image
      className={classNames('reset-form', className)}
      src={ReloadIcon}
      height={16}
      width={16}
      onClick={onClick}
      alt=''
    />
  );
}
