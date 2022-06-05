import axios from 'axios';
import { getScope } from '@/constants';
import { useUsers } from '@/store/userStore';
import { makeStrError, makeOk, type Result } from '@/util';
import { isDroneData, type DroneData } from './apitypes';
import { makeFetchError } from './util';

// Api calls to /resources
export async function getDroneData(): Promise<Result<DroneData[]>> {
    const userStore = useUsers();

    if (!userStore.loggedIn) {
        return makeStrError('Not logged in!');
    }
    // TODO: find better solution for this the asking manually in each function
    if (!userStore.hasScope(getScope)) {
        return makeStrError('Unauthorized scope!');
    }

    try {
        const resp = await axios.get('/api/tardis/resources/');
        const isDroneDataArray = (resp.data as Array<any>).every((element) => isDroneData(element));

        if (!isDroneDataArray) {
            return makeStrError(
                'Some DroneData in response don\'t have the right shape',
            );
        }

        return makeOk(resp.data);
    } catch (error: any) {
        return makeFetchError(error);
    }
}
