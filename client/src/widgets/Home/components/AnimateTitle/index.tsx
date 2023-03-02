import React, { memo } from 'react';

import { useAnimationText } from 'hooks';

import s from './AnimateTitle.module.scss';
import { Line } from 'UI';

const AnimateTitle = () => {
  const { text } = useAnimationText('Hello!\nWhat`s up?', true, 100);

  return (
    <div className={s.titleContainer}>
      <div>
        {text.map((el, i) => {
          const isLast = i === text.length - 1;
          return (
            <p key={i} className={[s.title, isLast ? s.main : ''].join(' ')}>
              {el}
            </p>
          );
        })}
      </div>
      <Line className={s.line} vertical />
    </div>
  );
};

export default memo(AnimateTitle);
