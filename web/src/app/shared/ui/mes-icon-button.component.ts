import {
  Component,
  input,
  output,
  type InputSignal,
  type InputSignalWithTransform,
  type OutputEmitterRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { trimmed, type MesSharedComponent } from './contracts/shared_component';
import { MesIconComponent } from './mes-icon.component';

/**
 * Generic Material Design 3 icon button wrapper component (`<mes-icon-button>`).
 *
 * @remarks
 * Implements {@link MesSharedComponent} and requires an explicit `ariaLabel` input to
 * guarantee WCAG AA accessibility for icon-only controls.
 */
@Component({
  selector: 'mes-icon-button',
  imports: [MatButtonModule, MesIconComponent],
  template: `
    @if (!hidden()) {
      @if (href()) {
        <a
          mat-icon-button
          [attr.id]="id() || null"
          [attr.data-testid]="testdataId() || null"
          [href]="href()"
          [target]="target()"
          [rel]="target() === '_blank' ? 'noopener noreferrer' : null"
          [attr.aria-label]="ariaLabel()"
          [attr.aria-disabled]="disabled() || null"
          [attr.title]="title() || ariaLabel()"
          [style]="styleOverride() || null"
          class="mes-icon-button"
          (click)="handleClick($event)"
        >
          <mes-icon [icon]="icon()" [size]="iconSize()" />
        </a>
      } @else {
        <button
          mat-icon-button
          type="button"
          [attr.id]="id() || null"
          [attr.data-testid]="testdataId() || null"
          [disabled]="disabled()"
          [attr.aria-label]="ariaLabel()"
          [attr.title]="title() || ariaLabel()"
          [style]="styleOverride() || null"
          class="mes-icon-button"
          (click)="handleClick($event)"
        >
          <mes-icon [icon]="icon()" [size]="iconSize()" />
        </button>
      }
    }
  `,
  styles: `
    .mes-icon-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `,
})
export class MesIconButtonComponent implements MesSharedComponent {
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
   * Whether the icon button is in a disabled, non-interactive state (`false` by default).
   */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Whether the icon button is hidden from view (`false` by default).
   */
  public readonly hidden: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional custom inline style override (`''` by default).
   */
  public readonly styleOverride: InputSignal<string> = input<string>('');

  /**
   * Required Material Design Icon identifier (e.g., `'mdi-github'`, `'mdi-weather-sunny'`).
   */
  public readonly icon: InputSignal<string> = input.required<string>();

  /**
   * Required accessible label (`aria-label`) describing the button action.
   */
  public readonly ariaLabel: InputSignal<string> = input.required<string>();

  /**
   * Optional tooltip `title` attribute (defaults to `ariaLabel`).
   */
  public readonly title: InputSignal<string | undefined> = input<string | undefined>(undefined);

  /**
   * Optional external or internal URL when the icon button acts as a link.
   */
  public readonly href: InputSignal<string | undefined> = input<string | undefined>(undefined);

  /**
   * Target attribute when `href` is provided (`'_blank'` by default).
   */
  public readonly target: InputSignal<string> = input<string>('_blank');

  /**
   * Icon glyph size in pixels (`20` by default).
   */
  public readonly iconSize: InputSignal<number> = input<number>(20);

  /**
   * Emits the native `MouseEvent` when clicked.
   */
  public readonly clicked: OutputEmitterRef<MouseEvent> = output<MouseEvent>();

  /**
   * Emits {@link clicked} when the control is enabled.
   *
   * @param event - Native mouse click event.
   */
  protected handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.clicked.emit(event);
  }
}
