import { isDroneData, type DroneData } from "@/api/apitypes"
import axios from "axios"
import { reactive } from "vue"
import { authStore } from "./authStore"

export const droneStore = reactive({
    droneData: [] as DroneData[],
    requestDrones() {
        console.log("Fetching drones");

        if (!authStore.loggedIn) {
            throw 'Not logged in!'
        }
        // TODO: find better solution for this the asking manually in each function
        if (!authStore.canGetResources()) {
            throw 'Unauthorized scope!'
        }

        axios.get("/api/tardis/resources/")
            .then(resp => {
                const isDroneDataArray = (resp.data as Array<any>).every(
                    element => isDroneData(element)
                )

                if (!isDroneDataArray) {
                    throw "Some DroneData in response don't have the right shape";
                }

                this.droneData = resp.data
                console.log("Successfully fetched drones")
            })
            .catch(err => console.error("Error while fetching Drones:", err))
    }
})