import { defineStore } from 'pinia';
import type { DroneData } from '@/api/apitypes';
import { getDroneData } from '@/api/resourcesCalls';
import { expect } from '@/util';
import FilterBarVue from '@/components/FilterBar.vue';
import { useErrors } from './errorStore';

export const loggedInStorageKey = 'loggedIn';
export const loggedInTrue = 'true';

export const useDrones = defineStore('droneStore', {
  state: () => ({
    droneData: [] as DroneData[],
    filteredDrones: [] as DroneData[],
  }),
  actions: {
    /**
     * Fetches drone data from the API
     */
    async requestDrones() {
      const res = await getDroneData();
      try {
        const drones = expect(res, 'Error while requesting drones:');
        this.droneData = drones;
        console.log('Successfully fetched drones');
      } catch (error) {
        useErrors().setDronesError(error as Error, 'Drone fetch failed!');
      }
    },
  },
});
