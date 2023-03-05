import React, { FC, memo, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { screens } from 'pages';
import { routeNames } from './types';
import { Layout } from 'widgets/Layout';
import { useAuth, useActions, useTypedSelector } from 'hooks';
import { Loader } from 'UI';
import { Logger } from 'shared';

const Navigation: FC = () => {
  const { onCheckIsAuth, isAuth } = useAuth();
  const { isAppLoading } = useTypedSelector((state) => state.app);
  const { action } = useActions();

  const getAll = async (): Promise<void> => {
    try {
      action.setIsAppLoadingAC(true);
      await Promise.all([onCheckIsAuth()]);
    } catch (error) {
      Logger.error('on get all', error);
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
          <Route path='/' element={<Layout />}>
            <Route element={<screens.Deeds />} path={routeNames.Deeds} />
            <Route element={<screens.Profile />} path={routeNames.Profile} />
            <Route
              element={<screens.Profile />}
              path={routeNames.Profile + '/:_id'}
            />
          </Route>
        ) : (
          <Route element={<screens.Auth />} path={routeNames.Auth} />
        )}
      </Routes>
    </>
  );
};

export default memo(Navigation);
