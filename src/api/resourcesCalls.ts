import axios from 'axios';
import { useUsers } from '@/store/userStore';
import { makeStrError, makeOk, type Result, makeError } from '@/util';
import { isDroneData, type DroneData } from './apitypes';

// Api calls to /resources
export async function getDroneData(): Promise<Result<DroneData[]>> {
    const userStore = useUsers();

    if (!userStore.loggedIn) {
        return makeStrError('Not logged in!');
    }

    try {
        const resp = await axios.get('/api/tardis/resources/');
        const isDroneDataArray = (resp.data as Array<any>).every((element) =>
            isDroneData(element)
        );

        if (!isDroneDataArray) {
            return makeStrError(
                "Some DroneData in response don't have the right shape"
            );
        }

        return makeOk(resp.data);
    } catch (error) {
        return makeError(error);
    }
}
