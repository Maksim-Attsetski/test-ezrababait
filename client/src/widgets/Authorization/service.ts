import axios from 'axios';
import { ICreateUser, ILoginInfo, IUser } from 'widgets/User';
import { $api, tokenName, TResponse, baseURL, Logger } from 'shared';
import { IAuthUserReponse } from './types';

class AuthService {
  routes = {
    login: 'auth/login',
    registration: 'auth/signup',
    refresh: 'auth/refresh',
    logout: 'auth/logout',
  }

  login = async (userInfo: ILoginInfo): Promise<IAuthUserReponse> => {
    try {
      const data = await $api.post<IAuthUserReponse>(this.routes.login, {
        tag: userInfo.tag,
        password: userInfo.tag,
      });

      Logger.info('login', data);
      localStorage.setItem(tokenName, data?.data?.tokens);

      return data.data;
    } catch (error) {
      throw error;
    }
  };
  registration = async (
    userInfo: ICreateUser
  ): Promise<IAuthUserReponse> => {
    try {
      const data = await $api.post<IAuthUserReponse>(this.routes.registration, userInfo);

      Logger.info('login', data);
      localStorage.setItem(tokenName, data?.data?.tokens);

      return data.data;
    } catch (error) {
      throw error;
    }
  };

  logout = async (): Promise<void> => {
    await $api.get(this.routes.logout);
    localStorage.removeItem(tokenName);
  };

  checkIsAuth = async (): Promise<IAuthUserReponse> => {
    try {
      const oldToken = localStorage.getItem(tokenName) || '';      
      const tokenData = await axios.get(this.routes.refresh, {
        withCredentials: true,
        baseURL,
        headers: {
          Authorization: 'Bearer ' + oldToken
        }
      });

      return tokenData.data;
    } catch (error) {
      throw error;
    }
  };
}

export default new AuthService();
