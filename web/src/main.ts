import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

/**
 * Bootstraps the standalone, zoneless Angular 22+ root application.
 */
bootstrapApplication(App, appConfig).catch((err: unknown) => console.error(err));
