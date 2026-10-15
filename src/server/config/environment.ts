import { z } from "zod";

/** Validates the environment values the foundation is permitted to consume. */
const environmentSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.url().optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).optional(),
});

/** Describes validated environment values available to server-side services. */
export type Environment = z.infer<typeof environmentSchema>;

/** Validates an untrusted environment object and returns its typed public configuration. */
export function parseEnvironment(environmentInput: unknown): Environment {
  return environmentSchema.parse(environmentInput);
}

/** Reads and validates the current process environment when a service needs configuration. */
export function getEnvironment(): Environment {
  return parseEnvironment(process.env);
}
