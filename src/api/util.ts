import axios from 'axios';
import { makeStrError, type Result, makeError } from '@/util';

// unfortunately has to be any (or maybe unknown) because currently the error in catch can only have the any or unknown type

export function makeFetchError<T>(error: any): Result<T> {
    if (axios.isAxiosError(error)) {
        return makeStrError(`Axios error: ${error.message}`);
    }
    return makeError(error);
}