import React, { FC, memo, MouseEventHandler } from 'react';
import s from './Button.module.scss';

interface IProps {
  className?: string;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button: FC<IProps> = ({ onClick, text, className = '', type }) => {
  return (
    <button onClick={onClick} className={`${s.btn} ${className}`} type={type}>
      {text}
    </button>
  );
};
export default memo(Button);
