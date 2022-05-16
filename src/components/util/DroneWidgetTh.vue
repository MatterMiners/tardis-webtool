<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        label: String,
    },
});
</script>

<template>
    <th
        class="border-b border-slate-300 bg-white font-normal p-1 text-slate-600"
    >
        {{ label }}
    </th>
</template>
