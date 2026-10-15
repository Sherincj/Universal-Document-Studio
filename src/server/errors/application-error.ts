/** Categorizes failures so routes can respond safely and services remain testable. */
export type ApplicationErrorCode = "validation" | "not_found" | "unexpected";

/** Carries a user-safe failure category without leaking diagnostic details. */
export class ApplicationError extends Error {
  /** Creates an application failure with a stable category and public message. */
  public constructor(
    readonly code: ApplicationErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "ApplicationError";
  }
}
