import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  memo,
  MouseEventHandler,
} from 'react';
import s from './Button.module.scss';

interface IProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
}

const Button: FC<IProps> = ({ text, className = '', ...props }) => {
  return (
    <button {...props} className={`${s.btn} ${className}`}>
      {text}
    </button>
  );
};
export default memo(Button);
