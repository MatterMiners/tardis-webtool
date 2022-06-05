<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { useUsers } from '@/store/userStore';
import ColoredTextButton from './util/ColoredTextButton.vue';

export default defineComponent({
    setup() {
        const userStore = useUsers();

        const { loggedIn } = storeToRefs(userStore);
        return { loggedIn, userStore };
    },
    data() {
        return {
            password: '',
            username: '',
        };
    },
    methods: {
        onLogin() {
            this.userStore.login(this.username, this.password);
            this.password = '';
        },
    },
    components: {
        ColoredTextButton,
    },
});
</script>

<template>
    <div
        class="flex flex-col justify-self-center items-center self-center p-5 m-10 max-w-fit bg-white rounded-md shadow-md"
    >
        <h2 class="m-1 text-3xl font-bold text-sky-700">Login</h2>
        <h3 class="m-2 text-xl text-slate-600">
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
                    class="px-4 mx-2 mt-3"
                />
                <ColoredTextButton
                    label="Register"
                    btnColorClass="bluebtn"
                    class="px-4 mx-2 mt-3"
                />
            </div>
        </form>
    </div>
</template>
