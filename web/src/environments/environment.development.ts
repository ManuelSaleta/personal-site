/**
 * Strongly-typed runtime environment contract for the Angular frontend.
 */
export interface AppEnvironment {
  /** Whether the application is running in production mode. */
  readonly production: boolean;
  /** Base URL for the .NET 10 Minimal API (`/api/v1`). */
  readonly apiBaseUrl: string;
}

/**
 * Local development environment configuration targeting the .NET 10 Minimal API.
 */
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000/api/v1',
} as const satisfies AppEnvironment;
