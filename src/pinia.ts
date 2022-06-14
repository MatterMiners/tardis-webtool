import type { Store } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createPinia } from 'pinia';

export const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

// var stores: Store[] = [];

// pinia.use(({ store }) => {
//   stores.push(store);
// });

// /**
//  * Resets all available pinia stores.
//  * Is called on each logout
//  * Unfortunately doesn't work :(
//  * TODO: Make work
//  */
// export function resetAllStores(): void {
//   stores.forEach((store) => {
//     store.$reset();
//   });
//   stores = [];
// }
