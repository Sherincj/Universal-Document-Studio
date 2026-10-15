import { getHealthPayload } from "@/server/health/health-service";
import { createApiSuccess } from "@/server/http/api-response";

/** Returns a public liveness envelope without exposing configuration or internal state. */
export function GET(): Response {
  return Response.json(createApiSuccess(getHealthPayload()));
}
