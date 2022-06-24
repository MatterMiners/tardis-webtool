import axios, { AxiosError } from 'axios';
import { refreshSession } from './userCalls';
import { expect } from '@/util';

axios.interceptors.response.use(
  (resp) => {
    return resp;
  },
  async (err: AxiosError) => {
    const originalConfig = err.config;
    if (
      !originalConfig.retryTimes &&
      err.response &&
      err.response.status == 401 &&
      (err.response.data as any).detail == 'Signature has expired'
    ) {
      console.log('Intercepted call with expired refresh token (trying again)');
      try {
        originalConfig.retryTimes = originalConfig.retryTimes
          ? originalConfig.retryTimes + 1
          : 1;

        let res = await refreshSession();
        console.log(expect(res, 'Access token couldnt be refreshed'));

        return axios(originalConfig);
      } catch (_err) {
        return Promise.reject(_err);
      }
    }
    return Promise.reject(err);
  }
);
