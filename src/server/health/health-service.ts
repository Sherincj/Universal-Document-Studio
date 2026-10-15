/** Represents the stable, public shape returned by the health endpoint. */
export type HealthPayload = {
  readonly status: "ok";
  readonly service: "universal-document-studio";
};

/** Builds a dependency-free liveness response for runtime and deployment checks. */
export function getHealthPayload(): HealthPayload {
  return { status: "ok", service: "universal-document-studio" };
}
