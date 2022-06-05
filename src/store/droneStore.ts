import { defineStore } from 'pinia';
import type { DroneData } from '@/api/apitypes';
import { getDroneData } from '@/api/resourcesCalls';
import { expect } from '@/util';

export const loggedInStorageKey = 'loggedIn';
export const loggedInTrue = 'true';

export const useDrones = defineStore('droneStore', {
    state: () => ({
        droneData: [] as DroneData[],
    }),
    actions: {
        async requestDrones() {
            const res = await getDroneData();
            const drones = expect(res, 'Error while requesting drones:');
            this.droneData = drones;
            console.log('Successfully fetched drones');
        },
    },
});
