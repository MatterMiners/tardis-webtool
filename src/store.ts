import { reactive } from "vue";
import axios from "axios";
import { parseJwt, type AccessTokenClaim } from "./util"


export const authStore = reactive({
    token: "",
    error: "",
    jwtclaim: {} as AccessTokenClaim,
    getToken(user: string, passwd: string) {
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
            })
            .catch((err) => {
                console.error("Error:", err.message);
                this.error = err.message;
            });
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
