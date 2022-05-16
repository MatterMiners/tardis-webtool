<script lang="ts">
import { defineComponent } from "vue";
import DroneGrid from "./components/DroneGrid.vue";

export default defineComponent({
    components: { DroneGrid },
});
</script>

<template>
    <nav class="flex p-3 mb-2 bg-white border-none shadow-md items-center">
        <img
            src="./assets/TARDIS_logo.svg"
            alt="Tardis Logo"
            class="h-10 mr-3"
        />
        <h1 class="text-2xl font-sans text-slate-700">webtool</h1>
    </nav>

    <DroneGrid />
</template>
