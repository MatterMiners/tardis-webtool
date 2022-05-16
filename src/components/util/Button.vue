<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        label: String,
    },
});
</script>

<template>
    <button class="btn hover:bg-blue-600 shadow-blue-500/50 bg-blue-500">
        {{ label }}
    </button>
</template>
