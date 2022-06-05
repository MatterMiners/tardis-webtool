<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { DroneData } from '@/api/apitypes';

export default defineComponent({
    props: {
        droneData: { type: Object as PropType<DroneData>, required: true },
    },
});
</script>

<template>
  <div class="mt-2 rounded border border-slate-300">
    <table class="w-full border-collapse table-auto">
      <thead>
        <tr>
          <th
            class="p-2 font-bold text-slate-700 bg-slate-50 rounded-tl border-r border-slate-300"
          >
            Property
          </th>
          <th class="p-2 font-bold text-slate-700 bg-slate-50 rounded-tr">
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th class="border-r myth">Remote Resource UUID</th>
          <th class="myth">{{ droneData.remote_resource_uuid }}</th>
        </tr>
        <tr>
          <th class="border-r myth">Site</th>
          <th class="myth">{{ droneData.site_name }}</th>
        </tr>
        <tr>
          <th class="border-r myth">Machine Type</th>
          <th class="myth">{{ droneData.machine_type }}</th>
        </tr>
        <tr>
          <th class="border-r myth">Created</th>
          <th class="myth">{{ droneData.created }}</th>
        </tr>
        <tr>
          <th class="rounded-bl border-r mythbottom">Updated</th>
          <th class="rounded-br mythbottom">
            {{ droneData.updated }}
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
