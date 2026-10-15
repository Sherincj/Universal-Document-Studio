/** Represents every successful HTTP response body returned by application routes. */
export type ApiSuccess<TData> = { readonly ok: true; readonly data: TData };

/** Represents every expected HTTP error body without exposing internal diagnostics. */
export type ApiFailure = {
  readonly ok: false;
  readonly error: { readonly code: string; readonly message: string };
};

/** Wraps route data in the stable success envelope consumed by application clients. */
export function createApiSuccess<TData>(data: TData): ApiSuccess<TData> {
  return { ok: true, data };
}

/** Wraps a safe error code and message in the stable failure envelope. */
export function createApiFailure(code: string, message: string): ApiFailure {
  return { ok: false, error: { code, message } };
}
