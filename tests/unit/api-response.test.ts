import { describe, expect, it } from "vitest";
import { createApiFailure, createApiSuccess } from "@/server/http/api-response";

describe("API response helpers", () => {
  /** Confirms routes expose successful payloads through one stable envelope. */
  it("creates a success envelope", () => {
    expect(createApiSuccess({ status: "ok" })).toEqual({
      ok: true,
      data: { status: "ok" },
    });
  });

  /** Confirms expected failures do not need to expose internal diagnostic data. */
  it("creates a safe failure envelope", () => {
    expect(createApiFailure("validation", "Invalid request")).toEqual({
      ok: false,
      error: { code: "validation", message: "Invalid request" },
    });
  });
});
