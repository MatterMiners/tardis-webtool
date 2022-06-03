import { makeError, makeOk, type Result } from "@/util";
import axios from "axios";
import { isUserData, type UserData } from "./apitypes";

// Api calls to /user
export function loginUser(
    user_name: string,
    password: string
): Result<UserData> {
    axios
        .post("/api/tardis/user/login", {
            password,
            user_name,
        })
        .then((resp) => {
            if (!isUserData(resp.data.user)) {
                return makeError("No user data returned by api");
            }
            return makeOk(resp.data.user);
        })
        .catch((err) => {
            return makeError(err.message);
        });

    return makeError("loginUser function reached the end!!!");
}

export function logoutUser(): Result<string> {
    axios
        .delete("/api/tardis/user/logout")
        .then((resp) => {
            return makeOk("Success at loggin out");
        })
        .catch((err) => {
            return makeError(err.message);
        });

    return makeOk("logoutUser function reached it's end");
}
