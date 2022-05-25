import { getScope } from "@/util"
import axios from "axios"
import { reactive } from "vue"
import type { DroneData } from "../main"
import { authStore } from "./authStore"

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