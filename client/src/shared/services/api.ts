import axios, { AxiosResponse } from 'axios';
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
  console.log('old token', token);

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
        console.log('new token', token);
        localStorage.setItem(tokenName, token.data.accessToken);

        return $api.request(originalReq);
      } catch (err: any) {
        console.log(err);
        throw err;
      }
    }
    throw error;
  }
);

export { $api };
