<script lang="ts">
import { defineComponent } from "vue";
import { store } from "../store";
import Button from "./util/Button.vue";

export default defineComponent({
    data() {
        return {
            store,
            password: "",
            username: "",
            tmp: "",
        };
    },
    methods: {
        onLogin() {
            store.getToken(this.username, this.password);
        },
    },
    created() {
        store.getToken(this.username, this.password);
    },
    components: {
        Button,
    },
});
</script>

<template>
    <div
        class="flex items-center self-center justify-self-center flex-col bg-white shadow-md p-5 max-w-fit rounded-md"
    >
        <h2 class="font-bold text-3xl text-sky-700 m-1">Login</h2>
        <h3 class="text-xl text-slate-600 m-2">
            Enter your login credentials.
        </h3>
        <form @submit.prevent class="flex flex-col">
            <input
                class="myinput"
                type="text"
                placeholder="Username"
                v-model="username"
            />
            <input
                class="myinput"
                type="text"
                placeholder="Password"
                v-model="password"
            />
            <div class="flex justify-center">
                <Button @click="onLogin" label="Login" class="px-4" />
                <Button label="Register" class="px-4" />
            </div>
        </form>
    </div>
    <!-- ONLY FOR DEBUG -->
    <p>ONLY FOR DEBUG: {{ store.token }}</p>
</template>
