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
    data() {
        return {
            collapse: true,
        };
    },
});
</script>

<template>
    <div class="relative h-min">
        <button
            @click="collapse = !collapse"
            class="flex place-content-center bg-slate-200 rounded-full w-8 aspect-square hover:bg-slate-300 transition-colors duration-150 absolute inset-x-0 mx-auto -bottom-2"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                class="w-fit fill-white transition-transform duration-500"
                :class="{ 'rotate-180': !collapse }"
            >
                <path
                    d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"
                />
            </svg>
        </button>
        <div
            :class="{ 'overflow-hidden h-24': collapse }"
            class="flex flex-col justify-between bg-white shadow-md rounded-md m-3 p-5 min-w-fit"
        >
            <div class="flex items-center justify-between mb-3 relative">
                <div class="text-left">
                    <h2 class="text-xl font-bold text-sky-700">
                        {{ droneData.drone_uuid }}
                    </h2>

                    <h3 class="font-semibold mt-1">{{ droneData.state }}</h3>
                </div>
                <PowerOffButton />
            </div>

            <DroneWidgetTable :droneData="droneData" />
            <Button label="Edit" class="mt-5 text-lg" />
        </div>
    </div>
</template>
