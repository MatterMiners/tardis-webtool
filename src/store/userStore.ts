import type { UserData } from '@/api/apitypes';
import { loginUser, logoutUser } from '@/api/userCalls';
import router from '@/router/router';
import { unwrap, unwrapLog } from '@/util';
import { defineStore } from 'pinia';
import { useDrones } from './droneStore';
import { useFilters } from './filterStore';

// persistent because userData doesn't change much (at all) during a session and doesn't have to be pulled regularily.
// But the user session has to be persistent across reloads

/**
 * The user store is responsible for the user session.
 * It is persistent and can be used across reloads.
 */
export const useUsers = defineStore('usersStore', {
  state: () => ({
    userData: {} as UserData,
    loggedIn: false,
  }),
  getters: {
    scopes: (state) => state.userData.scopes,
  },
  actions: {
    async login(username: string, password: string) {
      const res = await loginUser(username, password);
      // gets handled in Login Widget
      const user = unwrap(res);
      this.userData = user;
      this.loggedIn = true;

      router.push({ name: 'dashboard' });
      console.log('Logged in!');
    },
    async logout() {
      const res = await logoutUser();
      // TODO: replace with proper handling
      // Using this here because even if the api call doesn't work, the state should be set to logged out
      // If a fetch error occurs while logging out it's not that critical because all the session data gets deleted anyway
      unwrapLog(res);

      // Very unfortunate that all stores have to be called manually.
      // I tried using the resetAllStores() function in pina.ts but somehow it doesn't work properly
      // TODO: Find a way to reset all stores at once
      this.$reset();
      useDrones().$reset();
      useFilters().$reset();

      this.loggedIn = false;

      router.push({ name: 'login' });
      console.log('User logged out');
    },
    /**
     * Checks if the user is authorized to access the given scopes
     * @param scopes The scopes to check for
     * @returns true if the user is authorized, false otherwise
     */
    hasScopes(scopes: string[]): boolean {
      let out = true;
      scopes.forEach((scope) => {
        if (!this.scopes.includes(scope)) {
          out = false;
          return;
        }
      });
      return out;
    },
  },
  persist: true,
});
