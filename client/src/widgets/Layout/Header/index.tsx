import React, { FC, memo, SetStateAction, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from 'hooks';
import { routeNames } from 'navigation/types';
import { Button, IMenuLink, Sider } from 'UI';

import s from './style.module.scss';
import { UserSearch } from 'widgets/User';

const _Header: FC = () => {
  const { isAuth, onLogout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onBurgerClick = async () => {
    isAuth ? await onLogout() : navigate(routeNames.Auth);
  };

  const menuLinks: IMenuLink[] = useMemo(
    () =>
      isAuth
        ? [
            { text: 'Home', link: routeNames.Home },
            { text: 'Deeds', link: routeNames.Deeds },
            { text: 'Profile', link: routeNames.Profile },
          ]
        : [],
    [isAuth]
  );

  return (
    <div className={s.header}>
      <div className={'container ' + s.headerBody}>
        <Sider menu={menuLinks} isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className={s.buttonsContainer}>
          {isAuth && (
            <div className={s.search}>
              <UserSearch />
            </div>
          )}

          <div className={s.flex}>
            {isAuth &&
              menuLinks.map(({ link, text }) => (
                <NavLink className={s.navLink} key={link} to={link}>
                  {text}
                </NavLink>
              ))}
            {isAuth && (
              <Button
                className={s.drawerButton}
                onClick={() => setIsOpen((prev) => !prev)}
                text='Menu'
              />
            )}
            <Button
              onClick={onBurgerClick}
              text={isAuth ? 'Logout' : 'Sign in'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(_Header);
