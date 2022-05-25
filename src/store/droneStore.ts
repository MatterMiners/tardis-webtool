import { isDroneData, type DroneData } from "@/api/apitypes"
import axios from "axios"
import { reactive } from "vue"
import { authStore } from "./authStore"

export const droneStore = reactive({
    droneData: [] as DroneData[],
    requestDrones() {
        if (authStore.token == "") {
            throw 'Empty access_token!'
        }
        if (!authStore.canGetResources()) {
            throw 'Unauthorized scope!'
        }

        axios.get("/api/tardis/resources/", {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${authStore.token}`,
            }
        })
            .then(resp => {
                const isDroneDataArray = (resp.data as Array<any>).every(
                    element => isDroneData(element)
                )

                if (!isDroneDataArray) {
                    throw "Some DroneData in response don't have the right shape";
                }

                this.droneData = resp.data
            })
            .catch(err => console.error(err))
    }
})