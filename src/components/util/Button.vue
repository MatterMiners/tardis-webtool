<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        label: { type: String, required: true },
        btnColorClass: { type: String, required: true },
    },
});
</script>

<template>
    <button class="btn" :class="btnColorClass">
        {{ label }}
    </button>
</template>
