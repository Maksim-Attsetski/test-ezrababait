import React, { FC } from 'react';

interface IProps {
  size?: number;
}

const pencilSvg: FC<IProps> = ({ size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#icon-e12302352696ccc)'>
        <path
          d='M30.9995 8.99902L38.9995 16.999'
          stroke='#fff'
          strokeWidth='4'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7.99953 31.999L35.9994 4L43.9995 11.999L15.9995 39.999L5.99951 41.999L7.99953 31.999Z'
          stroke='#fff'
          strokeWidth='4'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M30.9995 8.99902L38.9995 16.999'
          stroke='#fff'
          strokeWidth='4'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M8.99951 31.999L15.9995 38.999'
          stroke='#fff'
          strokeWidth='4'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12.9995 34.999L34.9995 12.999'
          stroke='#fff'
          strokeWidth='4'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='icon-e12302352696ccc'>
          <rect width='48' height='48' fill='#fff' />
        </clipPath>
      </defs>
    </svg>
  );
};
export default pencilSvg;
