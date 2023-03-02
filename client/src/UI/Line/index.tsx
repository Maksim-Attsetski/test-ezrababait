import React, { FC, memo } from 'react';
import s from './Line.module.scss';

interface IProps {
  vertical?: boolean;
  className?: string;
}

const Line: FC<IProps> = ({ vertical = false, className = '' }) => {
  return (
    <div
      className={[s.line, vertical ? s.vertical : s.horizontal, className].join(
        ' '
      )}
    ></div>
  );
};
export default memo(Line);
