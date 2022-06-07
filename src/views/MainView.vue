<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '../components/NavBar.vue';

export default defineComponent({
    components: { NavBar },
});
</script>

<template>
    <div>
        <NavBar />
        <main class="flex flex-col items-center h-full">
            <router-view></router-view>
        </main>
    </div>
</template>
