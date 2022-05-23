<script lang="ts">
import { defineComponent } from "vue";
import DroneWidget from "./DroneWidget/DroneWidget.vue";
import type { DroneData } from "../main";
import { droneStore } from "@/store";

var id = 0;

export default defineComponent({
    data() {
        return {
            droneStore,
        };
    },
    components: { DroneWidget },
    created() {
        try {
            droneStore.requestDrones();
        } catch (error) {
            console.error("Error while trying initial drone pull:", error);
        }
    },
});
</script>

<template>
    <div
        class="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
    >
        <!-- Error handling if drone not right shape-->
        <DroneWidget
            v-for="drone in droneStore.droneData"
            :drone-data="drone"
            :key="drone.drone_uuid"
        />
    </div>
</template>
