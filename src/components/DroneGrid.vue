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
        class="grid 3xl:grid-cols-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-2"
    >
        <DroneWidget
            v-for="drone in droneStore.droneData"
            :drone-data="drone"
            :key="drone.drone_uuid"
        />
    </div>
</template>
