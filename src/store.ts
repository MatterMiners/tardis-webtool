import { reactive } from "vue"
import axios from "axios"

export const store = reactive({
    token: "",
    getToken(user: string, passwd: string) {
        axios.post('/api/tardis/login/access-token',
            `password=${passwd}&username=${user}`,
            {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => this.token = resp.data.access_token)
            .catch(err => console.error("Error:", err.message))
    }
})