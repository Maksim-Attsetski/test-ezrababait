import { assets } from 'assets';
import { routeNames } from 'navigation/types';
import React, { FC, memo, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSearch } from 'widgets/User';

import s from './Sider.module.scss';

export interface IMenuLink {
  link: routeNames;
  text: string;
}

interface IProps {
  menu: IMenuLink[];
  isOpen: boolean;
  setIsOpen: (val: SetStateAction<boolean>) => void;
}

const Sider: FC<IProps> = ({ menu, isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const onCloseSider = () => {
    setIsOpen(false);
  };

  const onClickLink = (link: routeNames) => {
    navigate(link);
    onCloseSider();
  };

  return (
    <div>
      <div
        onClick={onCloseSider}
        className={[s.shadow, isOpen ? s.active : ''].join(' ')}
      />
      <div className={[s.sider, isOpen ? s.active : ''].join(' ')}>
        <div className={s.siderBody}>
          {<assets.closeSvg onClick={onCloseSider} />}
          <div className={s.links}>
            {menu.map(({ link, text }) => (
              <div
                onClick={() => onClickLink(link)}
                className={s.link}
                key={link}
              >
                {text}
                <div className={s.line} />
              </div>
            ))}
          </div>
          <br />
          <UserSearch onOpen={() => setIsOpen(false)} />
        </div>
      </div>
    </div>
  );
};
export default memo(Sider);
