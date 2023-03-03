import React, { FC, MouseEventHandler } from 'react';

interface IProps {
  size?: number;
  onClick?: MouseEventHandler<SVGSVGElement> | undefined;
}

const closeSvg: FC<IProps> = ({ size = 24, onClick }) => {
  return (
    <svg
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      width={size}
      height={size}
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8 8L40 40'
        stroke='#333'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8 40L40 8'
        stroke='#333'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
export default closeSvg;
