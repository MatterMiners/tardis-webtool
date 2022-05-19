<script lang="ts">
import { defineComponent } from "vue";
import DroneGrid from "./components/DroneGrid.vue";
import Login from "./components/Login.vue";
import FilterBar from "./components/FilterBar.vue";

export default defineComponent({
    data() {
        return {
            token: String,
        };
    },
    components: { DroneGrid, Login, FilterBar },
});
</script>

<template>
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400&display=swap"
                rel="stylesheet"
            />
            <title>Tardis Webtool</title>
        </head>

        <body class="bg-slate-50 min-h-screen">
            <nav class="flex p-3 bg-white border-b shadow-md items-center">
                <img
                    src="./assets/TARDIS_logo.svg"
                    alt="Tardis Logo"
                    class="h-10 mr-3"
                />
                <h1 class="text-2xl text-slate-700">webtool</h1>
            </nav>

            <main class="flex items-center flex-col">
                <FilterBar />
                <DroneGrid />
                <!-- <Login class="mt-20" /> -->
            </main>
        </body>
    </html>
</template>
