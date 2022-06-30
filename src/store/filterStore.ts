import {
  getAllMachineTypes,
  getAllSites,
  getAllStates,
} from '@/api/filterCalls';
import { unwrap } from '@/util';
import { defineStore } from 'pinia';
import { useErrors } from './errorStore';

export const useFilters = defineStore('filterStore', {
  state: () => ({
    allStates: [] as string[],
    allSites: [] as string[],
    allMachineTypes: [] as string[],
  }),
  actions: {
    async fetchAll() {
      try {
        if (this.allStates.length === 0) {
          this.allStates = unwrap(await getAllStates());
        }
        if (this.allSites.length === 0) {
          this.allSites = unwrap(await getAllSites());
        }
        if (this.allMachineTypes.length === 0) {
          this.allMachineTypes = unwrap(await getAllMachineTypes());
        }
      } catch (error) {
        console.log('Error while fetching all filters:', error);
        useErrors().setGeneralError(
          error as Error,
          'Error while fetching all filters!'
        );
      }
    },
  },
});
