import React, { FC, memo, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { screens } from 'pages';
import { routeNames } from './types';
import { Layout } from 'widgets/Layout';
import {
  useAuth,
  useActions,
  useTypedSelector,
} from 'hooks';
import { Loader } from 'UI';

const Navigation: FC = () => {
  const { onCheckIsAuth, isAuth } = useAuth();
  const { isAppLoading } = useTypedSelector((state) => state.app);
  const { action } = useActions();

  const getAll = async (): Promise<void> => {
    try {
      action.setIsAppLoadingAC(true);
      await Promise.all([onCheckIsAuth()]);
    } catch (error) {
      console.log(error);
    } finally {
      action.setIsAppLoadingAC(false);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      {isAppLoading && <Loader />}

      <Routes>
        <Route path='/' element={<Layout />}>
          <Route element={<screens.Home />} path={routeNames.Home} />
          <Route element={<screens.Notfound />} path={routeNames.Notfound} />
        </Route>
        {isAuth ? (
          <Route path='/' element={<Layout />}></Route>
        ) : (
          <Route element={<screens.Auth />} path={routeNames.Auth} />
        )}
      </Routes>
    </>
  );
};

export default memo(Navigation);
