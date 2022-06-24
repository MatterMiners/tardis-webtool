import axios, { AxiosError } from 'axios';
import { makeStrError, type Result, makeError } from '@/util';
import { useUsers } from '@/store/userStore';
import {
  throttleAdapterEnhancer,
  cacheAdapterEnhancer,
} from 'axios-extensions';
import { useErrors } from '@/store/errorStore';

// set timeout to 2 seconds in case api is not reachable
axios.defaults.timeout = 2000;

// unfortunately has to be any (or maybe unknown) because currently the error in catch can only have the any or unknown type

// deprecated: doesn't return proper error type
export function makeFetchError<T>(error: any): Result<T> {
  if (axios.isAxiosError(error)) {
    return makeStrError(`Axios error: ${error.message}`);
  }
  return makeError(error);
}

export function setAxiosLoginError(error: AxiosError) {
  let errMsg = '';
  if (error.response) {
    var details = (error.response.data as any).detail;
  }

  if (details) {
    errMsg = details;
  } else if (error.code == 'ECONNABORTED') {
    errMsg = 'Connection Timed Out';
  } else if (error.code) {
    errMsg = error.code;
  } else {
    errMsg = 'Unknown Error';
  }

  useErrors().setLoginError(error, errMsg);
}

// only used for caching. Maybe implement also for all other stores
export const tardisHttp = axios.create({
  baseURL: '/api/tardis',
  headers: { 'Cache-Control': 'no-cache' },
  adapter: throttleAdapterEnhancer(
    cacheAdapterEnhancer(axios.defaults.adapter!, {
      enabledByDefault: false,
    })
  ),
});
