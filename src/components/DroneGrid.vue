<script lang="ts">
import { defineComponent } from "vue";
import DroneWidget from "./DroneWidget/DroneWidget.vue";
import { droneStore } from "@/store/droneStore";

export default defineComponent({
    data() {
        return {
            droneStore,
        };
    },
    components: { DroneWidget },
    mount() {
        // TODO: Error handling
        droneStore.requestDrones();
    },
});
</script>

<template>
    <div
        class="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
    >
        <DroneWidget
            v-for="drone in droneStore.droneData"
            :drone-data="drone"
            :key="drone.drone_uuid"
        />
    </div>
</template>
