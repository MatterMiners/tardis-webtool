<script lang="ts">
import type { DroneData } from '@/api/apitypes';
import { useDrones } from '@/store/droneStore';
import { useFilters } from '@/store/filterStore';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import FilterWidget from './FilterWidgets/FilterWidget.vue';
import SelectWidget from './util/SelectWidget.vue';
import SelectTextCombo from './util/SelectTextCombo.vue';

type filterTypes =
  | 'state'
  | 'site'
  | 'machine'
  | 'droneuuid'
  | 'rruuid'
  | 'createdBefore'
  | 'createdAfter'
  | 'updatedBefore'
  | 'updatedAfter';

interface Filter {
  label: string;
  type: filterTypes;
}

function displayType(type: filterTypes): string {
  switch (type) {
    case 'state':
      return 'State';
    case 'site':
      return 'Site';
    case 'machine':
      return 'Machine';
    case 'droneuuid':
      return 'Drone UUID';
    case 'rruuid':
      return 'RR UUID';
    case 'createdBefore':
      return 'Created Before';
    case 'createdAfter':
      return 'Created After';
    case 'updatedBefore':
      return 'Updated Before';
    case 'updatedAfter':
      return 'Updated After';
    default:
      return 'Unknown';
  }
}

function notADate(input: string): boolean {
  return isNaN(Date.parse(input));
}

/**
 * Returns < 0 if a is before b, 0 if they are equal, and > 0 if a is after b.
 * @param a {string} a date string in the format YYYY-MM-DDTHH:MM:SS.SSSZ
 * @param b {string} a date string in the format YYYY-MM-DDTHH:MM:SS.SSSZ
 */
function getDateDiff(a: string, b: string): number {
  const aDate = new Date(a);
  const bDate = new Date(b);
  return aDate.getTime() - bDate.getTime();
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
    case 'createdBefore':
      return getDateDiff(drone.created, filter.label) < 0;
    case 'createdAfter':
      return getDateDiff(drone.created, filter.label) > 0;
    case 'updatedBefore':
      return getDateDiff(drone.updated, filter.label) < 0;
    case 'updatedAfter':
      return getDateDiff(drone.updated, filter.label) > 0;
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
  props: {
    shown: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      statesExpanded: false,
      filters: [] as Filter[],
      typedFilters: [
        { label: displayType('droneuuid'), type: 'droneuuid' },
        { label: displayType('rruuid'), type: 'rruuid' },
        {
          label: displayType('createdBefore'),
          type: 'createdBefore',
          disabledWhen: notADate,
        },
        {
          label: displayType('createdAfter'),
          type: 'updatedBefore',
          disabledWhen: notADate,
        },
        {
          label: displayType('updatedBefore'),
          type: 'createdAfter',
          disabledWhen: notADate,
        },
        {
          label: displayType('updatedAfter'),
          type: 'updatedAfter',
          disabledWhen: notADate,
        },
      ] as {
        label: string;
        type: filterTypes;
        disabledWhen?: (input: string) => boolean;
      }[],
    };
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
    displayType(type: filterTypes): string {
      return displayType(type);
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
    numFilteredDrones() {
      return this.filteredDrones.length;
    },
    numDrones() {
      return this.droneData.length;
    },
  },
  watch: {
    filteredDrones() {
      this.droneStore.filteredDrones = this.filteredDrones;
    },
    shown(newValue: boolean) {
      if (newValue) {
        this.filterStore.fetchAll();
      }
    },
  },
  components: { FilterWidget, SelectWidget, SelectTextCombo },
});
</script>

<template>
  <section
    class="flex flex-col pt-3 pb-2 bg-white shadow-md sticky top-20 w-full items-center"
  >
    <div class="widget-container flex flex-col sm:flex-row items-center mx-2">
      <h3 class="text-lg mr-3 mb-3 sm:mb-0 whitespace-nowrap">
        <span class="font-semibold"
          >{{ numFilteredDrones }} / {{ numDrones }}</span
        >
        Drones
      </h3>
      <!-- didn't find a way to specify type as a filterTypes but im too tired now -->
      <div class="flex flex-wrap items-center justify-center">
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
    </div>

    <!-- filter widgets -->
    <div
      class="flex flex-row flex-wrap justify-center items-center pt-1 mx-2 border-t sm:pt-0 sm:border-none"
    >
      <FilterWidget
        v-for="filter in filters"
        class="m-1"
        :key="filter.label"
        :label="filter.label"
        :type="displayType(filter.type)"
        @delete-filter="filters = deleteFilter(filter)"
      />
    </div>
  </section>
</template>

<style scoped lang="postcss">
.widget-container * {
  @apply m-1;
}
</style>
