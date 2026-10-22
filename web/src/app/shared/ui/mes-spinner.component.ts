import { Component, input, type InputSignal, type InputSignalWithTransform } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { trimmed, type MesSharedComponent } from './contracts/shared_component';

/**
 * Generic Material Design 3 indeterminate circular progress spinner (`<mes-spinner>`).
 *
 * @remarks
 * Implements {@link MesSharedComponent}.
 */
@Component({
  selector: 'mes-spinner',
  imports: [MatProgressSpinnerModule],
  template: `
    @if (!hidden()) {
      <mat-progress-spinner
        mode="indeterminate"
        [attr.id]="id() || null"
        [attr.data-testid]="testdataId() || null"
        [attr.aria-disabled]="disabled() || null"
        [diameter]="size()"
        [attr.aria-label]="ariaLabel()"
        [style]="styleOverride() || null"
      />
    }
  `,
})
export class MesSpinnerComponent implements MesSharedComponent {
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
   * Whether the spinner is in a disabled state (`false` by default).
   */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Whether the spinner is hidden from view (`false` by default).
   */
  public readonly hidden: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional custom inline style override (`''` by default).
   */
  public readonly styleOverride: InputSignal<string> = input<string>('');

  /**
   * Spinner diameter in pixels (`32` by default).
   */
  public readonly size: InputSignal<number> = input<number>(32);

  /**
   * Accessible label describing the loading operation.
   */
  public readonly ariaLabel: InputSignal<string> = input<string>('Loading content');
}
