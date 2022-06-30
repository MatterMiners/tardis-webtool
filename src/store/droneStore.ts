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
    sortingKey: 'created',
    sortingDirection: 'asc' as 'asc' | 'desc',
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
    sortBy(key: string) {
      if (this.sortingKey === key) {
        this.sortingDirection =
          this.sortingDirection === 'asc' ? 'desc' : 'asc';
      }
      this.sortingKey = key;
    },
  },
  getters: {
    sortedDrones: (state) => {
      const sign = state.sortingDirection === 'asc' ? 1 : -1;
      try {
        return state.filteredDrones.sort((a, b) => {
          return (
            sign *
            (a as any)[state.sortingKey].localeCompare(
              (b as any)[state.sortingKey]
            )
          );
        });
      } catch (error) {
        console.log(`${state.sortingKey} is not a valid key`);
        return state.filteredDrones;
      }
    },
  },
});
