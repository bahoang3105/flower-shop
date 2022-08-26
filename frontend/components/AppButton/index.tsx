import React, { MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';

declare const ButtonVarients: ['default', 'primary', 'link', 'secondary'];
declare type ButtonVarient = typeof ButtonVarients[number];

type AppButtonProps = {
  variant?: ButtonVarient | undefined;
  prefixIcon?: ReactNode;
  afterIcon?: ReactNode;
  className?: string | undefined;
  onClick?: MouseEventHandler<HTMLElement>;
  text: ReactNode;
  disabled?: boolean;
  htmlType?: string | any;
  loading?: boolean;
  href?: string;
};

function AppButton({ variant = 'default', prefixIcon, afterIcon, text, className, ...props }: AppButtonProps) {
  return (
    <Button className={classNames('button', `button--${variant}`, className)} {...props}>
      {prefixIcon}
      <span>{text}</span>
      {afterIcon}
    </Button>
  );
}

export default AppButton;
