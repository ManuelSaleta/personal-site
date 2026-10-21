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
 * without `zone.js` overhead.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
  ],
};
