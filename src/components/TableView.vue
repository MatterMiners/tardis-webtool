<script lang="ts">
import { defineComponent } from 'vue';
import { useDrones } from '@/store/droneStore';
import DroneWidget from './DroneWidget/DroneWidget.vue';

export default defineComponent({
    setup() {
        const droneStore = useDrones();
        return { droneStore };
    },
    components: { DroneWidget },
    mounted() {
        // TODO: Error handling
        this.droneStore.requestDrones();
    },
});
</script>

<template>
    <div
        class="grow justify-self-stretch self-stretch m-5 bg-white rounded shadow-md flex justify-center items-center"
    >
    <table>
        
    </table>
    </div>
</template>
