import { reactive } from "vue";
import axios from "axios";
import { getScope, parseJwt, putScope } from "../util"
import type { AccessTokenClaim } from "../api/apitypes"

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
                const parsingResult = parseJwt(this.token)
                if (parsingResult instanceof Error) {
                    throw parsingResult
                }
                this.jwtclaim = parsingResult
                console.log("Login Successful!");
            })
            .catch((err) => {
                console.error("Error:", err.message);
                this.error = err.message;
            })
    },

    getScopes(): string[] {
        return this.jwtclaim.scopes
    },

    canGetResources(): boolean {
        return this.getScopes().includes(getScope)
    },

    canPutResources(): boolean {
        return this.getScopes().includes(putScope)
    }
});

