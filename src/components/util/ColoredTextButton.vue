<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: { type: String, required: true },
    btnColorClass: { type: String, required: true },
    disabled: Boolean,
  },
});
</script>

<template>
  <button class="btn" :class="btnColorClass" :disabled="disabled">
    {{ label }}
  </button>
</template>
