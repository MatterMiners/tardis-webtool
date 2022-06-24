import { createApp } from 'vue';
import App from './App.vue';
import { clickOutsideDirective } from './directives';
import './index.css';
import { pinia } from './pinia';
import router from './router/router';
import '@/api/interceptors';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');
