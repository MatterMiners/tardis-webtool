import { reactive } from "vue";
import axios from "axios";
import { getScope, putScope } from "../util";
import { isUserData } from "../api/apitypes";
import type { UserData } from "../api/apitypes";
export const authStore = reactive({
    error: "",
    userData: {} as UserData,
    loggedIn: false,

    login(user: string, passwd: string) {
        axios
            .post("/api/tardis/user/login", {
                password: passwd,
                user_name: user,
            })
            .then((resp) => {
                if (!isUserData(resp.data.user)) {
                    this.error = "No user data returned by api";
                    throw this.error;
                }
                this.userData = resp.data.user;
                this.loggedIn = true;
                console.log("Success:", resp.data.msg);
            })
            .catch((err) => {
                console.error("Error:", err.message);
                this.error = err.message;
            });
    },

    logout() {
        if (!this.loggedIn) {
            throw "Cannot log out if not logged in!";
        }
        axios
            .delete("/api/tardis/user/logout")
            .then((resp) => {
                this.loggedIn = false;
                console.log("Success:", resp.data.msg);
            })
            .catch((err) => {
                console.error("Error:", err.message);
                this.error = err.message;
            });
    },

    getScopes(): string[] {
        return this.userData.scopes;
    },

    canGetResources(): boolean {
        return this.getScopes().includes(getScope);
    },

    canPutResources(): boolean {
        return this.getScopes().includes(putScope);
    },
});
