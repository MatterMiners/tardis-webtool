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
    // Errors while logging out are always discarded
    const destIsLogoutOrRefresh = err.config.url?.match(/logout|refresh/i);
    if (!err.response || destIsLogoutOrRefresh) {
      return Promise.reject(err);
    }

    const accessTokenExpired =
      (err.response.data as any).detail == 'Signature has expired';
    const unauthorized = err.response.status == 401;

    if (unauthorized) {
      if (accessTokenExpired) {
        console.log(
          'Intercepted call with expired refresh token (trying again)'
        );
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
      } else if (unauthorized) {
        // This should never return here
        await forceLogout(err);
        return Promise.reject(err);
      }
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
