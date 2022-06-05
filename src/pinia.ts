import type { Store } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createPinia } from 'pinia';

export const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
