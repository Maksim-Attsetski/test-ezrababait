import React, { FC, memo, useState } from 'react';

import { Outlet } from 'react-router-dom';
import { Loader } from 'UI';
import { useTypedSelector } from 'hooks';

import Header from '../Header';
import s from './Layout.module.scss';

const _Layout: FC = () => {
  const { isLoading } = useTypedSelector((state) => state.app);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={s.rootLayout}>
      <div>
        <Header isOpen={collapsed} setIsOpen={setCollapsed} />
        <main className={`${s.content}`}>
            <Outlet />
            {isLoading && <Loader />}
        </main>
        <footer className={s.footer}>
          <div>Сделано Отцецким Максимом</div>
        </footer>
      </div>
    </div>
  );
};

export default memo(_Layout);
