import { describe, expect, it } from "vitest";
import { getHealthPayload } from "@/server/health/health-service";

describe("getHealthPayload", () => {
  /** Confirms liveness checks retain their stable public response contract. */
  it("returns the service liveness payload", () => {
    expect(getHealthPayload()).toEqual({
      status: "ok",
      service: "universal-document-studio",
    });
  });
});
