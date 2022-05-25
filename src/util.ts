import { AccessTokenClaim } from "./api/apitypes"

// source: https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
export function parseJwt(token: string): AccessTokenClaim {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const claim = JSON.parse(jsonPayload);
    return new AccessTokenClaim(claim)
};

export const getScope = "resources:get"
export const putScope = "resources:put"

export const droneReloadTime = 5000