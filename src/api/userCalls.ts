import axios from 'axios';
import { makeStrError, makeOk, type Result, makeError } from '@/util';
import { isUserData, type UserData } from './apitypes';

// Api calls to /user
export async function loginUser(
  username: string,
  password: string
): Promise<Result<UserData>> {
  try {
    const resp = await axios.post('/api/tardis/user/login', {
      password,
      user_name: username,
    });
    if (!isUserData(resp.data.user)) {
      return makeStrError('No user data returned by api');
    }
    return makeOk(resp.data.user);
  } catch (error: any) {
    return makeError(error);
  }
}

export async function logoutUser(): Promise<Result<string>> {
  try {
    await axios.delete('/api/tardis/user/logout');
    return makeOk('Success at loggin out');
  } catch (error) {
    return makeError(error);
  }
}

export async function refreshSession(): Promise<Result<string>> {
  try {
    await axios.post('/api/tardis/user/refresh');
    return makeOk('Session refreshed');
  } catch (error) {
    return makeError(error);
  }
}
