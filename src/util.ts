export const getScope = "resources:get";
export const putScope = "resources:put";

export const droneReloadTime = 5000;

export type Result<T, E = Error> = { ok: true; val: T } | { ok: false; err: E };

export function makeError<T>(err: string): Result<T> {
    return { ok: false, err: new Error(err) };
}

export function makeOk<T>(val: T): Result<T> {
    return { ok: true, val };
}

export function unwrap<T>(r: Result<T>): T {
    if (!r.ok) {
        throw r.err;
    }

    return r.val;
}

export function expect<T>(r: Result<T>, msg: string): T {
    if (!r.ok) {
        throw `Error '${r.err}' expected: ${msg}`;
    }

    return r.val;
}

export function handle<T>(
    r: Result<T>,
    success: (val: T) => void,
    handle: (err: Error) => void
): void {
    if (!r.ok) {
        return handle(r.err);
    } else {
        return success(r.val);
    }
}
