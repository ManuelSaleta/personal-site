import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavigationComponent } from './core/layout/app-navigation/app-navigation.component';

/**
 * Root application shell component (`<app-root>`).
 *
 * @remarks
 * Renders the fixed ambient spotlight and topographic contour SVG background layer,
 * the sticky Material 3 navigation bar (`<app-navigation>`), and the primary `<router-outlet>`.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppNavigationComponent],
  templateUrl: './app.html',
})
export class App {}
