/** Represents structured diagnostic data that may be emitted without document content. */
export type LogContext = Readonly<Record<string, string | number | boolean>>;

/** Writes a structured server-side error record; callers must omit secrets and document content. */
export function logError(eventName: string, context: LogContext): void {
  console.error(JSON.stringify({ level: "error", eventName, ...context }));
}
