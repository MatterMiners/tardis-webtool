import { useUsers } from '@/store/userStore';
import { makeError, makeOk, makeStrError, type Result } from '@/util';
import { isStringArray } from './apitypes';
import { tardisHttp } from './util';

// TODO: Implement a more general form of this for all the other calls
export async function getAllUtil(
    type_name: string,
    url: string,
    useCache: boolean = false
): Promise<Result<string[]>> {
    const userStore = useUsers();

    if (!userStore.loggedIn) {
        return makeStrError('Not logged in!');
    }

    try {
        const resp = await tardisHttp.get(url, { cache: useCache });

        if (!isStringArray(resp.data)) {
            return makeStrError(`${type_name} }response has invalid type`);
        }

        return makeOk(resp.data);
    } catch (error) {
        return makeError(error);
    }
}

export async function getAllStates(
    useCache: boolean = false
): Promise<Result<string[]>> {
    return await getAllUtil('getAllStates', '/types/states', useCache);
}

export async function getAllMachineTypes(
    useCache: boolean = false
): Promise<Result<string[]>> {
    return await getAllUtil(
        'getAllMachineTypes',
        '/types/machine_types',
        useCache
    );
}

export async function getAllSites(
    useCache: boolean = false
): Promise<Result<string[]>> {
    return await getAllUtil('getAllSites', '/types/sites', useCache);
}
