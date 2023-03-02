import { useAnimationText } from 'hooks';
import React, { FC, memo } from 'react';
import { AnimateTitle, OpenDeeds } from 'widgets/Home';

const HomePage: FC = () => {
  return (
    <div className='container'>
      <AnimateTitle />
      <br />
      <br />
      <OpenDeeds />
    </div>
  );
};

export default memo(HomePage);
