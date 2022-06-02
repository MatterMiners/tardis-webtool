<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        btnColorClass: { type: String, required: true },
    },
});
</script>

<template>
    <button class="btn" :class="btnColorClass">
        <slot />
    </button>
</template>
