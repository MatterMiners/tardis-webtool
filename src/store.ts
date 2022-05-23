import { reactive } from "vue";
import axios from "axios";
import type { DroneData } from "./main"
import { parseJwt, type AccessTokenClaim, getScope } from "./util"


export const authStore = reactive({
    token: "",
    error: "",
    jwtclaim: {} as AccessTokenClaim,
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
                this.token = resp.data.access_token
                this.jwtclaim = parseJwt(this.token)
                console.log("Login Successful!");
            })
            .catch((err) => {
                console.error("Error:", err.message);
                this.error = err.message;
            })
    },
    getScopes(): string[] | null {
        try {
            return this.jwtclaim.scopes
        } catch (error) {
            console.log(error);
            return null
        }
    }
});

export const droneStore = reactive({
    droneData: [] as DroneData[],
    requestDrones() {
        if (authStore.token == "") {
            throw 'Empty access_token!'
        }
        if (authStore.getScopes() == null || !authStore.getScopes()?.includes(getScope)) {
            throw 'Unauthorized scope!'
        }
        axios.get("/api/tardis/resources/", {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${authStore.token}`, // Better error handling here
            }
        })
            .then(resp => {
                this.droneData = resp.data;
            })
            .catch(err => console.error(err))
    }
})