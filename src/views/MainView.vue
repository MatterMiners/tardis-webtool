<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '../components/NavBar.vue';

export default defineComponent({
  components: { NavBar },
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
