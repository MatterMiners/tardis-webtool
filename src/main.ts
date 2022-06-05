import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { pinia } from './pinia';
import router from './router/router';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');
