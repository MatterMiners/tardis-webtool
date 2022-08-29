<script lang="ts">
import { defineComponent } from 'vue';
import { useDrones } from '@/store/droneStore';
import DroneWidget from './DroneWidget/DroneWidget.vue';

export default defineComponent({
  setup() {
    const droneStore = useDrones();
    return { droneStore };
  },
  data() {
    return {
      sort: 'updated',
    };
  },
  methods: {
    sortBy(sort: string) {
      this.droneStore.sortBy(sort);
    },
  },
  components: { DroneWidget },
  mounted() {
    this.droneStore.requestDrones();
  },
});
</script>

<template>
  <div
    class="self-stretch sm:m-5 bg-white rounded shadow-md flex flex-col overflow-x-scroll border border-b-0"
  >
    <table class="h-min">
      <thead class="border-b">
        <tr class="divide-x">
          <th @click="sortBy('drone_uuid')">Drone UUID</th>
          <th @click="sortBy('remote_resource_uuid')">RR UUID</th>
          <th @click="sortBy('state')">Drone State</th>
          <th @click="sortBy('site_name')">Site Name</th>
          <th @click="sortBy('machine_type')">Machine Type</th>
          <th @click="sortBy('created')">Created</th>
          <th @click="sortBy('updated')">Updated</th>
        </tr>
      </thead>
      <tbody class="divide-y">
        <tr v-for="drone in droneStore.sortedDrones" class="divide-x">
          <th>{{ drone.drone_uuid }}</th>
          <th>{{ drone.remote_resource_uuid }}</th>
          <th>{{ drone.state }}</th>
          <th>{{ drone.site_name }}</th>
          <th>{{ drone.machine_type }}</th>
          <th>{{ drone.created }}</th>
          <th>{{ drone.updated }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="postcss">
thead th {
  @apply font-medium p-2 px-10 text-slate-700 bg-slate-50 hover:bg-slate-100 hover:cursor-pointer;
}

tbody th {
  @apply px-3 border-b border-slate-300 bg-white font-normal p-1 text-slate-500  hover:bg-slate-50 hover:cursor-pointer;
}
</style>
