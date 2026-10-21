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
 * Production environment configuration.
 */
export const environment = {
  production: true,
  apiBaseUrl: '/api/v1',
} as const satisfies AppEnvironment;
