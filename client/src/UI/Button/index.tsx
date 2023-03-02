import React, { FC, memo, MouseEvent, MouseEventHandler } from 'react';
import s from './Button.module.scss';

interface IProps {
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string;
}

const Button: FC<IProps> = ({ onClick, text, className = '' }) => {
  return (
    <button onClick={onClick} className={`${s.btn} ${className}`}>
      {text}
    </button>
  );
};
export default memo(Button);
