import { useAuth } from 'hooks';
import { routeNames } from 'navigation/types';
import React, { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'UI';
import s from './OpenDeeds.module.scss';

interface IProps {}

const OpenDeeds: FC<IProps> = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  return (
    <div>
      {isAuth && (
        <Button
          onClick={() => navigate(routeNames.Auth)}
          text={'Open Good deeds'}
        />
      )}
    </div>
  );
};
export default memo(OpenDeeds);
