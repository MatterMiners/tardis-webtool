<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { store } from "../store";
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
});
</script>

<template>
    <div>
        <h2>Login</h2>
        <h3>Enter your login credentials.</h3>
        <form @submit.prevent>
            <input type="text" placeholder="Username" v-model="username" />
            <input type="text" placeholder="Password" v-model="password" />
            <button @click="onLogin">Login</button>
            <button>Register</button>
            <!-- ONLY FOR DEBUG -->
            <p>ONLY FOR DEBUG: {{ store.token }}</p>
        </form>
    </div>
</template>
