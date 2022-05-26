// import { type UserData, isUserData } from "./api/apitypes"

// source: https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
// export function parsejwt(token: string): userdata | error {
//     const base64url = token.split('.')[1];
//     const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonpayload = decodeuricomponent(atob(base64).split('').map(function (c) {
//         return '%' + ('00' + c.charcodeat(0).tostring(16)).slice(-2);
//     }).join(''));

//     const claim = json.parse(jsonpayload);
//     if (!isuserdata(claim)) {
//         return error("accesstokenclaim doesn't have the right shape");
//     }

//     return claim
// };

export const getScope = "resources:get"
export const putScope = "resources:put"

export const droneReloadTime = 5000