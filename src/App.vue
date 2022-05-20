<script lang="ts">
import { defineComponent } from "vue";
import DroneGrid from "./components/DroneGrid.vue";
import Login from "./components/Login.vue";
import FilterBar from "./components/FilterBar.vue";
import ColoredSlotButton from "./components/util/ColoredSlotButton.vue";

export default defineComponent({
    data() {
        return {
            token: String,
        };
    },
    components: { DroneGrid, Login, FilterBar, ColoredSlotButton },
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
            <section class="flex p-3 bg-white border-b shadow-md items-center">
                <img
                    src="./assets/TARDIS_logo.svg"
                    alt="Tardis Logo"
                    class="h-10 mr-3"
                />
                <h1 class="text-2xl text-slate-700">webtool</h1>
                <nav class="ml-auto">NAV: TODO</nav>
                <ColoredSlotButton btnColorClass="yellowbtn">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        class="fill-white h-7 aspect-square"
                    >
                        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                        <path
                            d="M464 16c-17.67 0-32 14.31-32 32v74.09C392.1 66.52 327.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.89 5.5 34.88-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c50.5 0 96.26 24.55 124.4 64H336c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32V48C496 30.31 481.7 16 464 16zM441.8 289.6c-16.92-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-50.5 0-96.25-24.55-124.4-64H176c17.67 0 32-14.31 32-32s-14.33-32-32-32h-128c-17.67 0-32 14.31-32 32v144c0 17.69 14.33 32 32 32s32-14.31 32-32v-74.09C119.9 445.5 184.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z"
                        />
                    </svg>
                </ColoredSlotButton>
            </section>

            <main class="flex items-center flex-col">
                <FilterBar />
                <DroneGrid />
                <!-- <Login class="mt-20" /> -->
            </main>
        </body>
    </html>
</template>
