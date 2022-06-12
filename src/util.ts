export type Result<T, E = Error> = { ok: true; val: T } | { ok: false; err: E };

export function makeStrError<T>(err: string): Result<T> {
  return { ok: false, err: new Error(err) };
}

export function makeError<T>(err: any): Result<T> {
  return { ok: false, err };
}

export function makeOk<T>(val: T): Result<T> {
  return { ok: true, val };
}

/**
 * Throws error if the result is not ok
 * @param r result to unwrap
 * @returns ok value of the result
 */
export function unwrap<T>(r: Result<T>): T {
  if (!r.ok) {
    throw r.err;
  }

  return r.val;
}

// Do not use in production. Works only for val of type null
/**
 * Logs the error
 * @param r result to unwrap
 */
export function unwrapLog<T>(r: Result<T>) {
  if (!r.ok) {
    console.log(r.err);
  }
}

/**
 * unwraps the result and throws an error with a custom message
 * @param r result to unwrap
 * @param msg custom message to throw
 * @returns ok value of the result
 */
export function expect<T>(r: Result<T>, msg: string): T {
  if (!r.ok) {
    throw new Error(`Error '${r.err}' expected: ${msg}`);
  }

  return r.val;
}

/**
 * Allows to handle errors and values in callbacks
 * @param r result to unwrap
 * @param success callback to call if the result is ok
 * @param handle callback to call if the result is error
 */
export function handle<T>(
  r: Result<T>,
  success: (val: T) => void,
  handle: (err: Error) => void
): void {
  if (!r.ok) {
    return handle(r.err);
  }
  return success(r.val);
}
