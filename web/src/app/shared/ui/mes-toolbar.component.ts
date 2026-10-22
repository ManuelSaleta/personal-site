import { NgOptimizedImage } from '@angular/common';
import { Component, input, type InputSignal, type InputSignalWithTransform } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { trimmed, type MesSharedComponent } from './contracts/shared_component';

/**
 * Generic Material Design 3 top application toolbar wrapper (`<mes-toolbar>`).
 *
 * @remarks
 * Implements {@link MesSharedComponent}, wraps `MatToolbarModule`, and optionally renders
 * a translucent background banner image via `NgOptimizedImage` (`bannerImage`).
 */
@Component({
  selector: 'mes-toolbar',
  imports: [MatToolbarModule, NgOptimizedImage],
  template: `
    @if (!hidden()) {
      <mat-toolbar
        class="m3-app-bar"
        [attr.id]="id() || null"
        [attr.data-testid]="testdataId() || null"
        [attr.aria-disabled]="disabled() || null"
        [class]="toolbarClass()"
        [style]="styleOverride() || null"
      >
        @if (bannerImage()) {
          <img
            [ngSrc]="bannerImage()!"
            alt=""
            fill
            priority
            class="banner-overlay"
            aria-hidden="true"
          />
        }
        <ng-content />
      </mat-toolbar>
    }
  `,
  styles: `
    .m3-app-bar {
      position: sticky;
      top: 0;
      z-index: 20;
      background-color: color-mix(in srgb, var(--color-surface) 88%, transparent) !important;
      border-bottom: 1px solid var(--color-border);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    .banner-overlay {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.15;
      pointer-events: none;
    }
  `,
})
export class MesToolbarComponent implements MesSharedComponent {
  /**
   * Unique DOM element identifier, automatically trimmed of leading/trailing whitespace.
   */
  public readonly id: InputSignalWithTransform<string, string | null | undefined> = input('', {
    transform: trimmed,
  });

  /**
   * Automated testing selector (`data-testid`) following Cypress / Vitest conventions,
   * automatically trimmed of leading/trailing whitespace.
   */
  public readonly testdataId: InputSignalWithTransform<string, string | null | undefined> = input(
    '',
    { transform: trimmed },
  );

  /**
   * Whether the toolbar is in a disabled state (`false` by default).
   */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Whether the toolbar is hidden from view (`false` by default).
   */
  public readonly hidden: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional custom inline style override (`''` by default).
   */
  public readonly styleOverride: InputSignal<string> = input<string>('');

  /**
   * Optional background banner image path rendered inside the toolbar with low opacity.
   */
  public readonly bannerImage: InputSignal<string | undefined> = input<string | undefined>(
    undefined,
  );

  /**
   * Additional CSS class names applied to `<mat-toolbar>`.
   */
  public readonly toolbarClass: InputSignal<string> = input<string>('');
}
