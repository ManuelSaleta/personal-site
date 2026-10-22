import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  type ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';

/**
 * Core application configuration for the zoneless Angular 22+ frontend.
 *
 * @remarks
 * Uses `provideZonelessChangeDetection()` so all UI updates are driven by Angular Signals
 * without `zone.js` overhead, alongside `provideHttpClient(withFetch())` and `provideRouter()`.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
  ],
};
