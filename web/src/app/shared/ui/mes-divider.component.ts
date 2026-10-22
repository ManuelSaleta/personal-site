import { Component, input, type InputSignal, type InputSignalWithTransform } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { trimmed, type MesSharedComponent } from './contracts/shared_component';

/**
 * Generic Material Design 3 horizontal/vertical divider wrapper component (`<mes-divider>`).
 *
 * @remarks
 * Implements {@link MesSharedComponent}.
 */
@Component({
  selector: 'mes-divider',
  imports: [MatDividerModule],
  template: `
    @if (!hidden()) {
      <mat-divider
        [attr.id]="id() || null"
        [attr.data-testid]="testdataId() || null"
        [attr.aria-disabled]="disabled() || null"
        [vertical]="vertical()"
        [class]="dividerClass()"
        [style]="styleOverride() || null"
      />
    }
  `,
})
export class MesDividerComponent implements MesSharedComponent {
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
   * Whether the divider is in a disabled state (`false` by default).
   */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Whether the divider is hidden from view (`false` by default).
   */
  public readonly hidden: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional custom inline style override (`''` by default).
   */
  public readonly styleOverride: InputSignal<string> = input<string>('');

  /**
   * Whether the divider is rendered vertically (`false` by default).
   */
  public readonly vertical: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional additional CSS class names applied to `<mat-divider>`.
   */
  public readonly dividerClass: InputSignal<string> = input<string>('');
}
