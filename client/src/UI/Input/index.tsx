import React, { DetailedHTMLProps, FC, InputHTMLAttributes, memo } from 'react';
import s from './Input.module.scss';

interface IProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input: FC<IProps> = (props) => {
  return (
    <div className={s.inputContainer}>
      <input {...props} className={s.input + ' ' + props?.className || ''} />
    </div>
  );
};
export default memo(Input);
