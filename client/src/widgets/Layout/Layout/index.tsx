import React, { memo, useState } from 'react';

import { Outlet } from 'react-router-dom';
import { Loader } from 'UI';
import { useAuth, useTypedSelector } from 'hooks';

import Header from '../Header';
import s from './Layout.module.scss';

const _Layout: React.FC = () => {
  const { isLoading } = useTypedSelector((state) => state.app);
  const { isAuth } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={s.rootLayout}>
      <div className='h-full'>
        <Header isOpen={collapsed} setIsOpen={setCollapsed} />
        <main
          className={`${s.content} ${collapsed ? s.active : ''} ${
            isAuth ? s.auth : ''
          }`}
        >
          <div className='p-2 w-full'>
            <Outlet />
            {isLoading && <Loader />}
          </div>
        </main>
        <footer className={s.footer}>
          <div>Сделано Отцецким Максимом</div>
        </footer>
      </div>
    </div>
  );
};

export default memo(_Layout);
