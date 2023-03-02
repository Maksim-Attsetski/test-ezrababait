import React, { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'hooks';
import { routeNames } from 'navigation/types';

import s from './style.module.scss';

interface IProps {
  setIsOpen: (val: boolean) => void;
  isOpen: boolean;
}

const _Header: FC<IProps> = ({ setIsOpen, isOpen }) => {
  const { isAuth, onLogout } = useAuth();
  const navigate = useNavigate();

  const onBurgerClick = async () => {
    isAuth ? await onLogout() : navigate(routeNames.Auth);
  };

  return (
    <div className={s.header}>
      <div className={'container ' + s.headerBody}>
        <div className={s.sider}></div>
        <div className={s.buttonsContainer}>
          <button className={s.drawerButton} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'close' :'open'}
          </button>
          <button onClick={onBurgerClick}>{isAuth ? 'Выйти' : 'Войти'}</button>
        </div>
      </div>
    </div>
  );
};

export default memo(_Header);
