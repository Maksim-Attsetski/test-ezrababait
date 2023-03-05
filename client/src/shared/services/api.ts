import axios, { AxiosResponse } from 'axios';
import { Logger } from 'shared';
import { baseURL } from '../config';

export const tokenName = '@auth/access_token';

export type TResError = { message: string };
export type TResponse<T> = Promise<AxiosResponse<T, TResError>>;
export type TEmptyResponse = Promise<AxiosResponse<void, TResError>>;

const $api = axios.create({
  withCredentials: true,
  baseURL,
});

$api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(tokenName);
  Logger.info('old token', token);

  config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = '*/*'
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalReq = error.config;

    if (error.status === 401 && originalReq && !originalReq._isRetry) {
      originalReq._isRetry = true;
      try {
        const token = await axios.get(baseURL + 'refresh');
        Logger.info('new token', token);
        localStorage.setItem(tokenName, token.data.accessToken);

        return $api.request(originalReq);
      } catch (err: any) {
        Logger.error('error on get new token', err);
        throw err;
      }
    }
    throw error;
  }
);

export { $api };
