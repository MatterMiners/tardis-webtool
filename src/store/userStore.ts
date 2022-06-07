import { defineStore } from 'pinia';
import type { UserData } from '@/api/apitypes';
import { loginUser, logoutUser } from '@/api/userCalls';
import { resetAllStores } from '@/pinia';
import { expect } from '@/util';

// persistent because userData doesn't change much (at all) during a session and doesn't have to be pulled regularily.
// But the user session has to be persistent across reloads

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
            const user = expect(res, 'Error while logging in');
            this.$state.userData = user;
            this.loggedIn = true;
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

            this.loggedIn = false;
            console.log('User logged out');
        },
        hasScope(scope: string): boolean {
            return this.scopes.includes(scope);
        },
    },
    persist: true,
});
