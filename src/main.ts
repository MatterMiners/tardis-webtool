import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { pinia } from './pinia';
import router from './router/router';
import '@/api/interceptors';
import axiosRetry from 'axios-retry';
import axios from 'axios';

axiosRetry(axios, { retries: 2 });

const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');
