<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import ColoredTextButton from "../util/ColoredTextButton.vue";
import type { DroneData } from "@/api/apitypes";
import DroneWidgetTable from "./DroneWidgetTable.vue";
import ColoredSlotButton from "../util/ColoredSlotButton.vue";

export default defineComponent({
    props: {
        droneData: { type: Object as PropType<DroneData>, required: true },
    },
    components: {
        ColoredTextButton,
        DroneWidgetTable,
        ColoredSlotButton,
    },
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
                <ColoredSlotButton btnColorClass="redbtn"
                    ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        class="stroke-white fill-white w-7"
                    >
                        <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
                        <path
                            d="M400 54.1c63 45 104 118.6 104 201.9 0 136.8-110.8 247.7-247.5 248C120 504.3 8.2 393 8 256.4 7.9 173.1 48.9 99.3 111.8 54.2c11.7-8.3 28-4.8 35 7.7L162.6 90c5.9 10.5 3.1 23.8-6.6 31-41.5 30.8-68 79.6-68 134.9-.1 92.3 74.5 168.1 168 168.1 91.6 0 168.6-74.2 168-169.1-.3-51.8-24.7-101.8-68.1-134-9.7-7.2-12.4-20.5-6.5-30.9l15.8-28.1c7-12.4 23.2-16.1 34.8-7.8zM296 264V24c0-13.3-10.7-24-24-24h-32c-13.3 0-24 10.7-24 24v240c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24z"
                        />
                    </svg>
                </ColoredSlotButton>
            </div>

            <DroneWidgetTable :droneData="droneData" />
            <ColoredTextButton
                label="Edit"
                btnColorClass="bluebtn"
                class="mt-5 text-lg"
            />
        </div>
    </div>
</template>
