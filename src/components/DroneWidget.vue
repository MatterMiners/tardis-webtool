<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { DroneData } from "../main";
import Button from "./util/Button.vue";
import PowerOffButton from "./util/PowerOffButton.vue";
import DroneWidgetTh from "./util/DroneWidgetTh.vue";

export default defineComponent({
    props: { droneData: Object as PropType<DroneData> },
    components: { Button, PowerOffButton, DroneWidgetTh },
});
</script>

<template>
    <div
        class="flex flex-col justify-between bg-white shadow-md rounded-md m-3 p-5 min-w-fit max-w-fit"
    >
        <h2 class="text-xl font-bold text-sky-700">
            {{ droneData?.drone_uuid }}
        </h2>

        <h3 class="text-lg border-b-2 p-1 m-1">
            State:
            <span class="font-semibold">{{ droneData?.state }}</span>
        </h3>

        <table class="border-collapse table-auto">
            <thead>
                <tr>
                    <DroneWidgetTh
                        label="Property"
                        class="font-bold p-2 rounded-md bg-slate-50 text-slate-700 border-r"
                    />
                    <DroneWidgetTh
                        label="Value"
                        class="font-bold p-2 rounded-md bg-slate-50 text-slate-700"
                    />
                </tr>
            </thead>
            <tbody>
                <tr>
                    <DroneWidgetTh
                        label="Remote Resource UUID"
                        class="border-r"
                    />
                    <DroneWidgetTh :label="droneData?.remote_resource_uuid" />
                </tr>
                <tr>
                    <DroneWidgetTh label="Site" class="border-r" />
                    <DroneWidgetTh :label="droneData?.site_name" />
                </tr>
                <tr>
                    <DroneWidgetTh label="Machine Type" class="border-r" />
                    <DroneWidgetTh :label="droneData?.machine_type" />
                </tr>
                <tr>
                    <DroneWidgetTh label="Created" class="border-r" />
                    <DroneWidgetTh :label="droneData?.created" />
                </tr>
                <tr>
                    <DroneWidgetTh label="Updated" class="border-r" />
                    <DroneWidgetTh :label="droneData?.updated" class="" />
                </tr>
            </tbody>
        </table>

        <div class="flex mx-2 justify-between">
            <Button label="Edit" class="px-7 text-lg" />
            <PowerOffButton />
        </div>
    </div>
</template>
