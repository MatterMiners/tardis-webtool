<script lang="ts">
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { useUsers } from '@/store/userStore';
import { parseAxiosError } from '@/api/util';
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
      loginError: '' as string | undefined,
    };
  },
  methods: {
    async onLogin() {
      try {
        await this.userStore.login(this.username, this.password);
        this.loginError = '';
        this.$router.push('/protected/dashboard');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          this.loginError = parseAxiosError(error);
        } else {
          this.loginError = 'Unknown Error';
        }
      }

      this.password = '';
    },
  },
  components: {
    ColoredTextButton,
  },
  computed: {
    credentialsEmpty(): boolean {
      return this.password == '' || this.username == '';
    },
  },
});
</script>

<template>
  <div
    class="flex flex-col justify-self-center items-center self-center p-5 m-10 max-w-fit bg-white rounded-md shadow-md"
  >
    <h2 class="m-1 text-3xl font-bold text-header">Login</h2>
    <h3 class="m-2 text-xl text-slate-600">Enter your login credentials.</h3>
    <h3 class="mb-1 text-error text-md">
      {{ loginError }}
    </h3>
    <form @submit.prevent class="flex flex-col text-slate-600">
      <input
        class="myinput m-1"
        type="text"
        placeholder="Username"
        v-model="username"
      />
      <input
        class="myinput m-1"
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
          :disabled="credentialsEmpty"
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
