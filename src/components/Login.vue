<script lang="ts">
import { defineComponent } from "vue";
import { store } from "../store";
export default defineComponent({
    data() {
        return {
            store,
            passwd: String,
            username: String,
        };
    },
    methods: {
        onSubmit() {
            // make api call to /login/access-token
        },
    },
});
</script>

<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="onSubmit">
            <input type="text" placeholder="Username" v-model="passwd" />
            <input type="text" placeholder="Password" />
            <button>Submit</button>
            <button>Register</button>
            <!-- ONLY FOR DEBUG -->
            <p>ONLY FOR DEBUG: {{ store.token }}</p>
        </form>
    </div>
</template>
