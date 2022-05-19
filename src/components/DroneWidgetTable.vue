<script lang="ts">
import type { DroneData } from "@/main";
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
    props: {
        droneData: { type: Object as PropType<DroneData>, required: true },
    },
});
</script>

<template>
    <table class="border-collapse table-auto">
        <thead>
            <tr>
                <th
                    class="font-bold p-2 rounded-md bg-slate-50 text-slate-700 border-r"
                >
                    Property
                </th>
                <th class="font-bold p-2 rounded-md bg-slate-50 text-slate-700">
                    Property
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th class="myth border-r">Remote Resource UUID</th>
                <th class="myth">{{ droneData.remote_resource_uuid }}</th>
            </tr>
            <tr>
                <th class="myth border-r">Site</th>
                <th class="myth">{{ droneData.site_name }}</th>
            </tr>
            <tr>
                <th class="myth border-r">Machine Type</th>
                <th class="myth">{{ droneData.machine_type }}</th>
            </tr>
            <tr>
                <th class="myth border-r">Created</th>
                <th class="myth">{{ droneData.created }}</th>
            </tr>
            <tr>
                <th class="myth border-r">Updated</th>
                <th class="myth">{{ droneData.updated }}</th>
            </tr>
        </tbody>
    </table>
</template>
