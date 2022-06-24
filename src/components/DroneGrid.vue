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
    class="grid self-stretch sm:self-center sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-2 space-y-6 sm:space-y-0"
  >
    <DroneWidget
      v-for="drone in droneStore.filteredDrones"
      :drone-data="drone"
      :key="drone.drone_uuid"
    />
  </div>
</template>
