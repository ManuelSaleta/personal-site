import {
  Component,
  input,
  model,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
} from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { trimmed, type MesSharedComponent } from './contracts/shared_component';
import { MesIconComponent } from './mes-icon.component';

/**
 * Strongly-typed option item for {@link MesButtonToggleComponent}.
 */
export interface MesButtonToggleOption<T extends string = string> {
  /** Option value emitted when selected. */
  readonly value: T;
  /** Visible button label. */
  readonly label: string;
  /** Optional Material Design Icon name rendered before the label. */
  readonly icon?: string;
}

/**
 * Generic Material Design 3 segmented button toggle group (`<mes-button-toggle>`).
 *
 * @remarks
 * Implements {@link MesSharedComponent} and uses Angular's two-way `model.required<T>()`
 * signal (`[(value)]`) to synchronize selection state.
 */
@Component({
  selector: 'mes-button-toggle',
  imports: [MatButtonToggleModule, MesIconComponent],
  template: `
    @if (!hidden()) {
      <mat-button-toggle-group
        [attr.id]="id() || null"
        [attr.data-testid]="testdataId() || null"
        [value]="value()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel()"
        [style]="styleOverride() || null"
        hideSingleSelectionIndicator="true"
        (change)="onSelectionChange($event.value)"
      >
        @for (option of options(); track option.value) {
          <mat-button-toggle [value]="option.value" [disabled]="disabled()">
            @if (option.icon) {
              <mes-icon [icon]="option.icon" [size]="16" />
            }
            <span class="mes-button-toggle__label">{{ option.label }}</span>
          </mat-button-toggle>
        }
      </mat-button-toggle-group>
    }
  `,
  styles: `
    .mes-button-toggle__label {
      margin-left: var(--space-1);
    }
  `,
})
export class MesButtonToggleComponent<T extends string = string> implements MesSharedComponent {
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
   * Whether the segmented toggle group is disabled (`false` by default).
   */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Whether the segmented toggle group is hidden from view (`false` by default).
   */
  public readonly hidden: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional custom inline style override (`''` by default).
   */
  public readonly styleOverride: InputSignal<string> = input<string>('');

  /**
   * Two-way bound selected option value (`[(value)]`).
   */
  public readonly value: ModelSignal<T> = model.required<T>();

  /**
   * List of toggle options to display in the segmented group.
   */
  public readonly options: InputSignal<readonly MesButtonToggleOption<T>[]> =
    input.required<readonly MesButtonToggleOption<T>[]>();

  /**
   * Accessible label for the segmented button group.
   */
  public readonly ariaLabel: InputSignal<string> = input<string>('View mode selector');

  /**
   * Updates the two-way {@link value} model when the user selects an option.
   *
   * @param nextValue - Newly selected option value.
   */
  protected onSelectionChange(nextValue: T): void {
    if (!this.disabled()) {
      this.value.set(nextValue);
    }
  }
}
