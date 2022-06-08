import {
    getAllMachineTypes,
    getAllSites,
    getAllStates,
} from '@/api/filterCalls';
import { unwrap } from '@/util';
import { defineStore } from 'pinia';

export const useFilters = defineStore('filterStore', {
    state: () => ({
        allStates: [] as string[],
        allSites: [] as string[],
        allMachineTypes: [] as string[],
    }),
    actions: {
        async fetchAll() {
            try {
                this.allStates = unwrap(await getAllStates(true));
                this.allSites = unwrap(await getAllSites(true));
                this.allMachineTypes = unwrap(await getAllMachineTypes(true));
            } catch (error) {
                console.log('Error while fetching all filters:', error);
            }
        },
    },
});
