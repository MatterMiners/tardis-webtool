import axios, { AxiosError } from 'axios';
import { makeStrError, type Result, makeError } from '@/util';

// set timeout to 2 seconds in case api is not reachable
axios.defaults.timeout = 2000;

// unfortunately has to be any (or maybe unknown) because currently the error in catch can only have the any or unknown type

// deprecated: doesn't return proper error type
export function makeFetchError<T>(error: any): Result<T> {
    if (axios.isAxiosError(error)) {
        return makeStrError(`Axios error: ${error.message}`);
    }
    return makeError(error);
}

export function parseAxiosError(error: AxiosError): string {
    // for now error codes will be displayed
    if (error.response) {
        var details = (error.response.data as any).detail;
    }

    if (details) {
        return details;
    } else if (error.code == 'ECONNABORTED') {
        return 'Connection Timed Out';
    } else if (error.code) {
        return error.code;
    } else {
        return 'Unknown Fetch Error';
    }
}
