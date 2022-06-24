<script lang="ts">
import { defineComponent } from 'vue';
import { useDrones } from '@/store/droneStore';
import DroneWidget from './DroneWidget/DroneWidget.vue';

export default defineComponent({
  setup() {
    const droneStore = useDrones();
    return { droneStore };
  },
  components: { DroneWidget },
  mounted() {
    // TODO: Error handling
    this.droneStore.requestDrones();
  },
});
</script>

<template>
  <div
    class="grow self-stretch sm:m-5 bg-white rounded shadow-md flex flex-col overflow-x-scroll border border-b-0"
  >
    <table class="h-min">
      <thead class="border-b">
        <tr class="divide-x">
          <th>Drone UUID</th>
          <th>RR UUID</th>
          <th>Drone State</th>
          <th>Site Name</th>
          <th>Machine Type</th>
          <th>Created</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody class="divide-y">
        <tr v-for="drone in droneStore.filteredDrones" class="divide-x">
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

<style lang="postcss">
thead th {
  @apply font-medium p-2 px-10 text-slate-700 bg-slate-50;
}

tbody th {
  @apply font-normal p-1 px-3 myth border-slate-200;
}
</style>
