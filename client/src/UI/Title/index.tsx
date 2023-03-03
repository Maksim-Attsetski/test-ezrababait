import React, { FC, memo, MouseEventHandler, useMemo } from 'react';
import s from './Title.module.scss';

interface IProps {
  text: string;
  className?: string;
  isSubTitle?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}

const Title: FC<IProps> = ({
  text,
  className = '',
  isSubTitle = false,
  onClick,
}) => {
  const inputClassName = useMemo(
    () => [isSubTitle ? s.subTitle : s.title, className].join(' '),
    [className, isSubTitle]
  );

  return (
    <div onClick={onClick} className={inputClassName}>
      {text}
    </div>
  );
};
export default memo(Title);
