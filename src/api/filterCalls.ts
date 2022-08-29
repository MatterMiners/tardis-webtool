import { useUsers } from '@/store/userStore';
import { makeError, makeOk, makeStrError, type Result } from '@/util';
import axios from 'axios';
import { isStringArray } from './apitypes';

// TODO: Implement a more general form of this for all the other calls
export async function getAllUtil(
  type_name: string,
  url: string
): Promise<Result<string[]>> {
  const userStore = useUsers();

  if (!userStore.loggedIn) {
    return makeStrError('Not logged in!');
  }

  try {
    const resp = await axios.get(url);

    if (!isStringArray(resp.data)) {
      return makeStrError(`${type_name} }response has invalid type`);
    }

    return makeOk(resp.data);
  } catch (error) {
    return makeError(error);
  }
}

export async function getAllStates(): Promise<Result<string[]>> {
  return await getAllUtil('getAllStates', '/api/tardis/types/states');
}

export async function getAllMachineTypes(): Promise<Result<string[]>> {
  return await getAllUtil(
    'getAllMachineTypes',
    '/api/tardis/types/machine_types'
  );
}

export async function getAllSites(): Promise<Result<string[]>> {
  return await getAllUtil('getAllSites', '/api/tardis/types/sites');
}
