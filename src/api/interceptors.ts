import axios, { AxiosError } from 'axios';
import { refreshSession } from './userCalls';
import { expect } from '@/util';
import { useErrors } from '@/store/errorStore';
import { useUsers } from '@/store/userStore';

const refreshFailedMsg = 'Refresh failed';
axios.interceptors.response.use(
  (resp) => {
    return resp;
  },
  async (err: AxiosError) => {
    if (
      err.response &&
      err.response.status == 401 &&
      err.config.url?.match(/refresh|logout/i)
    ) {
      return Promise.reject(err);
    }

    // refreshable? error
    if (
      err.response &&
      (err.response.data as any).detail == 'Signature has expired'
    ) {
      console.log('Intercepted call with expired refresh token (trying again)');
      try {
        let res = await refreshSession();
        console.log(expect(res, 'Access token couldnt be refreshed'));

        return axios(err.config);
      } catch (_err) {
        console.log('Could not refresh access token');
        useErrors().setAuthError(_err as Error, refreshFailedMsg);
        await forceLogout(_err as AxiosError);
        return Promise.reject(_err);
      }
    } else {
      await forceLogout(err);
      return Promise.reject(err);
    }
  }
);

async function forceLogout(err: AxiosError<unknown, any>) {
  // if the user is unauthorized and the session cannot be refreshed for some reason: log him out
  useErrors().setAuthError(err, 'Unexpected unauthorized error');

  const error_msg = 'Forcefully logged out!';
  useErrors().setLoginError(Error(error_msg), error_msg);
  console.log(error_msg);

  await useUsers().logout();
}
