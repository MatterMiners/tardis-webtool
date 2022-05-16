<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
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
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <button>Submit</button>
            <button>Register</button>
        </form>
    </div>
</template>
