/**
 * Helper function to get OpenAPI paths with type safety and IntelliSense.
 */

import { paths } from "./schema";

const DEFAULT_PORT = 8080;
const DEFAULT_HOST = "http://localhost";

/*const DEFAULT_HOST =
  process.env.NODE_ENV === "development"
    ? "http://localhost"
    : "http://backend";*/

export function getPath<PathKey extends keyof paths>(
  path: PathKey,
  port: number = DEFAULT_PORT,
  host: string = DEFAULT_HOST
): string {
  return `${host}:${port}${path}`;
}
