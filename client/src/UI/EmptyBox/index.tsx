import React, { FC, memo } from 'react';
import { assets } from 'assets';

interface IProps {
  text: string;
}

import s from './EmptyBox.module.scss';

const EmptyBox: FC<IProps> = ({ text }) => {
  return (
    <div className={s.empty}>
      <img className={s.emptyImg} src={assets.emptyBox} alt='empty' />
      <div className={s.emptyText}>{text}</div>
    </div>
  );
};

export default memo(EmptyBox);
