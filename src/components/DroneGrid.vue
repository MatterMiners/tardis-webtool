<script lang="ts">
import { sessionStore } from "@/store/sessionStore";
import { defineComponent } from "vue";
import DroneWidget from "./DroneWidget/DroneWidget.vue";

export default defineComponent({
    data() {
        return {
            sessionStore,
        };
    },
    components: { DroneWidget },
    mount() {
        // TODO: Error handling
        sessionStore.requestDrones();
    },
});
</script>

<template>
    <div
        class="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
    >
        <DroneWidget
            v-for="drone in sessionStore.sessionData.droneData"
            :drone-data="drone"
            :key="drone.drone_uuid"
        />
    </div>
</template>
