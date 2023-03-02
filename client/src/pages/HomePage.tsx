import { useAnimationText } from 'hooks';
import React, { FC, memo } from 'react';
import { AnimateTitle } from 'widgets/Home';

const HomePage: FC = () => {
  return (
    <div className='container'>
      <AnimateTitle />
    </div>
  );
};

export default memo(HomePage);
