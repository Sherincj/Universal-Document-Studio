import { describe, expect, it } from "vitest";
import { parseEnvironment } from "@/server/config/environment";

describe("parseEnvironment", () => {
  /** Confirms a valid public URL becomes typed configuration. */
  it("accepts supported environment values", () => {
    expect(
      parseEnvironment({ NEXT_PUBLIC_APP_URL: "http://localhost:3000" })
        .NEXT_PUBLIC_APP_URL,
    ).toBe("http://localhost:3000");
  });

  /** Confirms malformed configuration stops startup consumers with a validation error. */
  it("rejects malformed public URLs", () => {
    expect(() =>
      parseEnvironment({ NEXT_PUBLIC_APP_URL: "not-a-url" }),
    ).toThrow();
  });
});
