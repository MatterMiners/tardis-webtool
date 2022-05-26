import { reactive } from "vue";
import axios from "axios";
import { getScope, putScope } from "../util"
import { isUserData, type UserData } from "../api/apitypes"

export const authStore = reactive({
    error: "",
    userdata: {} as UserData,

    requestToken(user: string, passwd: string) {
        axios
            .post(
                "/api/tardis/login/access-token",
                `password=${passwd}&username=${user}`,
                {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            )
            .then((resp) => {
                if (!isUserData(resp.data)) {
                    throw "Response wasn't UserData"
                }
                this.userdata = resp.data
                console.log("Login Successful!");
            })
            .catch((err) => {
                console.error("Error:", err.message);
                this.error = err.message;
            })
    },

    getScopes(): string[] {
        return this.userdata.scopes
    },

    canGetResources(): boolean {
        return this.getScopes().includes(getScope)
    },

    canPutResources(): boolean {
        return this.getScopes().includes(putScope)
    }
});

