<script lang="ts">
import { useFilters } from '@/store/filterStore';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const filterStore = useFilters();
        const { allStates, allSites, allMachineTypes } =
            storeToRefs(filterStore);
        return { filterStore, allStates, allSites, allMachineTypes };
    },
    created() {
        this.filterStore.fetchAll();
    },
});
</script>

<template>
    <section
        class="flex justify-center p-2 bg-white shadow-md sticky z-10 top-20 w-full"
    >
        <input type="text" placeholder="Filter" class="myinput" />
        <p v-for="state in allStates" class="text-xl">{{ state }}</p>
        <p v-for="state in allSites" class="text-red-400">{{ state }}</p>
        <p v-for="state in allMachineTypes" class="text-blue-400">
            {{ state }}
        </p>
    </section>
</template>
