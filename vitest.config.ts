import { defineConfig } from "vitest/config";

/** Configures fast Node-based unit tests and project path aliases. */
export default defineConfig({
  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },
  test: { include: ["tests/unit/**/*.test.ts"] },
});
