import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root application shell component (`<app-root>`).
 *
 * @remarks
 * Omitting `standalone: true` (default in Angular v20+), `changeDetection: OnPush` (default in Angular v22+),
 * and `styleUrl` (all styles reside in the single global `src/styles/styles.scss` stylesheet).
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  /**
   * Application display title signal.
   */
  protected readonly title = signal<string>('web');
}
