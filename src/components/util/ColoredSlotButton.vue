<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        btnColorClass: { type: String, required: true },
        disabled: Boolean,
    },
});
</script>

<template>
    <button class="btn" :class="btnColorClass" :disabled="disabled">
        <slot />
    </button>
</template>
