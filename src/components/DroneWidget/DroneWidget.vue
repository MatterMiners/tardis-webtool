<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { DroneData } from "@/main";
import Button from "../util/Button.vue";
import PowerOffButton from "../util/PowerOffButton.vue";
import DroneWidgetTable from "./DroneWidgetTable.vue";

export default defineComponent({
    props: {
        droneData: { type: Object as PropType<DroneData>, required: true },
    },
    components: { Button, PowerOffButton, DroneWidgetTable },
});
</script>

<template>
    <div
        class="flex flex-col justify-between bg-white shadow-md rounded-md m-3 p-5 min-w-fit max-w-fit"
    >
        <div class="flex items-center justify-between mb-2">
            <div class="text-left">
                <h2 class="text-xl font-bold text-sky-700">
                    {{ droneData.drone_uuid }}
                </h2>

                <h3 class="text-lg">
                    State:
                    <span class="font-semibold">{{ droneData.state }}</span>
                </h3>
            </div>
            <PowerOffButton />
        </div>

        <DroneWidgetTable :droneData="droneData" />

        <Button label="Edit" class="px-7 mt-4 text-lg" />
    </div>
</template>
