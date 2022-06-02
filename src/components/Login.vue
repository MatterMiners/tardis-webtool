<script lang="ts">
import { authStore } from "@/store/authStore";
import { defineComponent } from "vue";
import ColoredTextButton from "./util/ColoredTextButton.vue";

export default defineComponent({
    data() {
        return {
            authStore,
            password: "",
            username: "",
        };
    },
    methods: {
        onLogin() {
            try {
                authStore.login(this.username, this.password);
                this.password = "";
            } catch (error) {
                console.log(error);
            }
        },
    },
    components: {
        ColoredTextButton,
    },
});
</script>

<template>
    <div
        class="flex items-center self-center justify-self-center flex-col bg-white shadow-md p-5 max-w-fit rounded-md m-10"
    >
        <h2 class="font-bold text-3xl text-sky-700 m-1">Login</h2>
        <h3 class="text-xl text-slate-600 m-2">
            Enter your login credentials.
        </h3>
        <form @submit.prevent class="flex flex-col text-slate-600">
            <input
                class="myinput"
                type="text"
                placeholder="Username"
                v-model="username"
            />
            <input
                class="myinput"
                type="password"
                placeholder="Password"
                v-model="password"
            />
            <div class="flex justify-center">
                <ColoredTextButton
                    @click="onLogin"
                    label="Login"
                    btnColorClass="bluebtn"
                    class="px-4 mt-3 mx-2"
                />
                <ColoredTextButton
                    label="Register"
                    btnColorClass="bluebtn"
                    class="px-4 mt-3 mx-2"
                />
            </div>
        </form>
    </div>
</template>
