import axios from 'axios';
import { ICreateUser, ILoginInfo, IUser } from 'widgets/User';
import { $api, tokenName, TResponse, baseURL } from 'shared';
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

      console.log('login', data);
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

      console.log('login', data);
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
      const tokenData = await axios.get(this.routes.refresh, {
        withCredentials: true,
        baseURL,
      });

      return tokenData.data;
    } catch (error) {
      throw error;
    }
  };
}

export default new AuthService();
