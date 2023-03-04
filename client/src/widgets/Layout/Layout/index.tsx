import React, { FC, memo, useState } from 'react';

import { Outlet } from 'react-router-dom';
import { Loader } from 'UI';
import { useTypedSelector } from 'hooks';

import Header from '../Header';
import s from './Layout.module.scss';

const _Layout: FC = () => {
  const { isLoading } = useTypedSelector((state) => state.app);

  return (
    <div className={s.rootLayout}>
      <div>
        <Header />
        <main className={s.content}>
          <Outlet />
          {isLoading && <Loader />}
        </main>
        <footer className={s.footer}>
          <div>Maded by: Attsetski Maksim</div>
        </footer>
      </div>
    </div>
  );
};

export default memo(_Layout);
