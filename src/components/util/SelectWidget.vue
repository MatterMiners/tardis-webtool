<script lang="ts">
import { clickOutsideDirective } from '@/directives';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  data() {
    return {
      expanded: false,
    };
  },
  directives: {
    clickOutside: clickOutsideDirective,
  },
  props: {
    data: {
      type: Object as PropType<string[]>,
      required: true,
    },
    label: {
      type: String,
      default: 'Select',
    },
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded;
    },
    collapse() {
      this.expanded = false;
    },
  },
});
</script>

<template>
  <!-- Something isn't right about the positioning of the dropdown menu -->
  <div class="myselectcontainer mx-1" v-click-outside="collapse">
    <button class="myselectbtn w-44" @click="toggle">
      <p>{{ label }}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        class="h-4 fill-slate-400"
      >
        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"
        />
      </svg>
    </button>
    <ul v-if="expanded" class="myselectul top-[2.5rem] w-44">
      <li
        v-for="item in data"
        class="myselectli"
        @click="$emit('clickedItem', item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
