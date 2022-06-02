<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../components/NavBar.vue";

export default defineComponent({
    components: { NavBar },
});
</script>

<template>
    <NavBar />
    <main class="flex items-center flex-col h-full">
        <router-view></router-view>
    </main>
</template>
