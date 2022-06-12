<script lang="ts">
import type { DroneData } from '@/api/apitypes';
import { useDrones } from '@/store/droneStore';
import { useFilters } from '@/store/filterStore';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import FilterWidget from './FilterWidgets/FilterWidget.vue';
import SelectWidget from './util/SelectWidget.vue';
import SelectTextCombo from './util/SelectTextCombo.vue';

type filterTypes = 'state' | 'site' | 'machine' | 'droneuuid' | 'rruuid';

interface Filter {
  label: string;
  type: filterTypes;
}

/**
 * Checks if a drone is filtered out by the current filters.
 * @param drone The drone to check.
 * @param filter The filters to check against.
 */
function passesFilter(drone: DroneData, filter: Filter): boolean {
  switch (filter.type) {
    case 'state':
      return drone.state == filter.label;
    case 'site':
      return drone.site_name == filter.label;
    case 'machine':
      return drone.machine_type == filter.label;
    case 'droneuuid':
      return drone.drone_uuid == filter.label;
    case 'rruuid':
      return drone.remote_resource_uuid == filter.label;
  }
}

/**
 * Checks if drone matches all filters where filters of the same type are ored.
 * Potentially slow. Find better implementation.
 * @param drone Drone to check
 * @param filters Filters to check against
 */
function passesAllFilters(drone: DroneData, filters: Filter[]): boolean {
  let passedFilters = {
    state: undefined,
    site: undefined,
    machine: undefined,
  } as { [key: string]: undefined | boolean };

  for (const filter of filters) {
    let passedCurrentFilter = passedFilters[filter.type];
    if (!passesFilter(drone, filter)) {
      if (passedCurrentFilter === undefined) {
        passedFilters[filter.type] = false;
      } else {
        passedCurrentFilter = passedCurrentFilter || false;
      }
    } else {
      passedFilters[filter.type] = true;
    }
  }

  let passed = true;
  for (const key in passedFilters) {
    if (passedFilters[key] === undefined || passedFilters[key]) {
      passed &&= true;
    } else {
      passed &&= false;
    }
  }

  return passed;
}

export default defineComponent({
  setup() {
    const filterStore = useFilters();
    const droneStore = useDrones();
    const { droneData } = storeToRefs(droneStore);
    const { allStates, allSites, allMachineTypes } = storeToRefs(filterStore);
    return {
      filterStore,
      allStates,
      allSites,
      allMachineTypes,
      droneData,
      droneStore,
    };
  },
  data() {
    return {
      statesExpanded: false,
      filters: [] as Filter[],
      typedFilters: [
        { label: 'Drone UUID', type: 'droneuuid' },
        { label: 'RR UUID', type: 'rruuid' },
      ] as { label: string; type: filterTypes }[],
    };
  },
  created() {
    this.filterStore.fetchAll();
  },
  methods: {
    addFilter(filter: Filter) {
      let includesFilter = false;
      this.filters.forEach((el) => {
        if (el.label === filter.label && el.type === filter.type) {
          return (includesFilter = true);
        }
      });

      if (!includesFilter) {
        this.filters.push(filter);
      }
    },
    deleteFilter(filter: Filter): Filter[] {
      return this.filters.filter((el) => el != filter);
    },
    addTextFilter(data: { type: filterTypes; text: string }) {
      this.filters.push({ label: data.text, type: data.type });
    },
  },
  computed: {
    /**
     * Returns a list of drones that match the current filters
     */
    filteredDrones(): DroneData[] {
      const filteredDrones = this.droneData.filter((drone: DroneData) => {
        return passesAllFilters(drone, this.filters);
      });
      return filteredDrones;
    },
  },
  watch: {
    filteredDrones() {
      this.droneStore.filteredDrones = this.filteredDrones;
    },
  },
  components: { FilterWidget, SelectWidget, SelectTextCombo },
});
</script>

<template>
  <section class="flex p-3 bg-white shadow-md sticky z-10 top-20 w-full">
    <!-- filter widgets -->
    <div class="flex items-center" v-for="filter in filters">
      <FilterWidget
        class="mx-1"
        :key="filter.label"
        :label="filter.label"
        @delete-filter="filters = deleteFilter(filter)"
      />
    </div>
    <!-- didn't find a way to specify type as a filterTypes but im too tired now -->
    <div class="flex ml-auto">
      <SelectTextCombo
        label="Field"
        :data="typedFilters"
        @clicked-item="(data) => addTextFilter(data)"
      />

      <SelectWidget
        label="Select State"
        :data="allStates"
        @clicked-item="
          (filterLabel) => addFilter({ label: filterLabel, type: 'state' })
        "
      />
      <SelectWidget
        label="Select Site"
        :data="allSites"
        @clicked-item="
          (filterLabel) => addFilter({ label: filterLabel, type: 'site' })
        "
      />
      <SelectWidget
        label="Select Machine"
        :data="allMachineTypes"
        @clicked-item="
          (filterLabel) => addFilter({ label: filterLabel, type: 'machine' })
        "
      />
    </div>
  </section>
</template>
