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
            if (!this.loggedIn) {
                throw new Error('Cannot log out if not logged in!');
            }
            const res = await logoutUser();
            expect(res, 'Error while logging out');
            sessionStorage.clear();
            resetAllStores();
            this.loggedIn = false;
            console.log('User logged out');
        },
        hasScope(scope: string): boolean {
            return this.scopes.includes(scope);
        },
    },
    persist: true,
});
