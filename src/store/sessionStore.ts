import type { DroneData, UserData } from "@/api/apitypes";
import { getDroneData } from "@/api/resourcesCalls";
import { loginUser, logoutUser } from "@/api/userCalls";
import { expect, getScope, putScope } from "@/util";
import { reactive } from "vue";

// for storing, fetching, deleting and providing all global session data
export const sessionStore = reactive({
    sessionData: {
        droneData: [] as DroneData[],
        userData: {} as UserData,
    },

    resetStoreData() {
        this.sessionData = { droneData: [], userData: {} as UserData };
    },

    requestDrones() {
        let res = getDroneData();
        let drones = expect(res, "Error while requesting drones:");
        this.sessionData.droneData = drones;
        console.log("Successfully fetched drones");
    },

    login(username: string, password: string) {
        let res = loginUser(username, password);
        let user = expect(res, "Error while logging in");
        // must be sessionStorage to be persistent
        // consider security
        sessionStorage.setItem("loggedIn", "true");
        this.sessionData.userData = user;
    },

    logout() {
        if (!this.loggedIn) {
            throw "Cannot log out if not logged in!";
        }
        let res = logoutUser();
        expect(res, "Error while logging out");
        console.log("User logged out");
        sessionStorage.clear();
        this.resetStoreData();
    },

    loggedIn(): boolean {
        return sessionStorage.getItem("loggedIn") === "true";
    },

    getScopes(): string[] {
        return this.sessionData.userData.scopes;
    },

    canGetResources(): boolean {
        return this.getScopes().includes(getScope);
    },

    canPutResources(): boolean {
        return this.getScopes().includes(putScope);
    },
});
