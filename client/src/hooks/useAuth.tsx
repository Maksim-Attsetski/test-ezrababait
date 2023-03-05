import { useNavigate } from 'react-router-dom';

import { useTypedSelector, useActions } from 'hooks';
import { routeNames } from 'navigation/types';
import { tokenName, Logger } from 'shared';
import { authService, IAuthUserReponse } from 'widgets/Authorization';
import { ICreateUser, ILoginInfo } from 'widgets/User';

const useAuth = () => {
  const navigation = useNavigate();
  const { isAuth } = useTypedSelector((state) => state.user);
  const { action } = useActions();

  const dispatchAuth = (newUser: IAuthUserReponse) => {
    action.setIsAuthAC(newUser.user);
    newUser?.user?._id && navigation(routeNames[!!newUser ? 'Home' : 'Auth']);
  };

  const onLogin = async (userInfo: ILoginInfo): Promise<boolean> => {
    try {
      const newUser = await authService.login(userInfo);
      dispatchAuth(newUser);
      return !!newUser?.user?._id;
    } catch (error) {
      Logger.error('error on authorization', error);
      throw error;
    }
  };

  const onRegistration = async (userInfo: ICreateUser): Promise<boolean> => {
    try {
      const newUser = await authService.registration(userInfo);
      dispatchAuth(newUser);

      return !!newUser?.user?._id;
    } catch (error) {
      Logger.error('error on authorization', error);
      throw error;
    }
  };

  const onLogout = async (): Promise<void> => {
    await authService.logout();
    action.setIsAuthAC(null);
    navigation(routeNames.Auth);
  };

  const onCheckIsAuth = async (): Promise<void> => {
    try {
      const tokenData = await authService.checkIsAuth();
      Logger.info('tokenData.data', tokenData);

      if (tokenData?.tokens) {
        Logger.info('tokenData', tokenData);
        localStorage.setItem(tokenName, tokenData?.tokens);
        action.setIsAuthAC(tokenData.user);
      }
    } catch (error: any) {
      Logger.error('error on check is auth', error);
    }
  };

  return { isAuth, onLogin, onLogout, onCheckIsAuth, onRegistration };
};

export default useAuth;
