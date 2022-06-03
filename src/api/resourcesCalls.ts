import { sessionStore } from "@/store/sessionStore";
import { makeError, makeOk, type Result } from "@/util";
import axios from "axios";
import { isDroneData, type DroneData } from "./apitypes";

// Api calls to /resources
export function getDroneData(): Result<DroneData[]> {
    if (!sessionStore.loggedIn()) {
        return makeError("Not logged in!");
    }
    // TODO: find better solution for this the asking manually in each function
    if (!sessionStore.canGetResources()) {
        return makeError("Unauthorized scope!");
    }

    axios
        .get("/api/tardis/resources/")
        .then((resp) => {
            const isDroneDataArray = (resp.data as Array<any>).every(
                (element) => isDroneData(element)
            );

            if (!isDroneDataArray) {
                return makeError(
                    "Some DroneData in response don't have the right shape"
                );
            }

            return makeOk(resp.data);
        })
        .catch((err) => {
            return makeError(err.message);
        });

    return makeError("Reached the end of getDroneData");
}
