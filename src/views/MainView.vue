<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '../components/NavBar.vue';

export default defineComponent({
  components: { NavBar },
  mounted() {
    // copy inner html of table entries on click to clipboard
    window.addEventListener('mousedown', (e) => {
      const el = e.target as HTMLElement;
      if (el.tagName === 'TH') {
        const copyText = el.innerHTML;
        navigator.clipboard.writeText(copyText);
      }
    });
  },
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex flex-col items-center h-full self-stretch grow">
      <router-view></router-view>
    </main>
  </div>
</template>
