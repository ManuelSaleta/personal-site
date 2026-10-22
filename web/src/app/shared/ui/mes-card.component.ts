import {
  Component,
  computed,
  input,
  type InputSignal,
  type InputSignalWithTransform,
  type Signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { trimmed, type MesSharedComponent } from './contracts/shared_component';

/**
 * Supported border-radius tokens for {@link MesCardComponent}.
 */
export type MesCardRadius = 'lg' | 'xl' | '2xl';

/**
 * Supported surface visual variants for {@link MesCardComponent}.
 */
export type MesCardVariant = 'outlined' | 'elevated' | 'filled';

/**
 * Generic Material Design 3 card wrapper component (`<mes-card>`).
 *
 * @remarks
 * Implements {@link MesSharedComponent} and encapsulates Angular Material `MatCardModule`
 * with `.m3-card` surface styling, configurable corner radius (`lg`, `xl`, `2xl`), and content projection.
 */
@Component({
  selector: 'mes-card',
  imports: [MatCardModule],
  template: `
    @if (!hidden()) {
      <mat-card
        appearance="outlined"
        [attr.id]="id() || null"
        [attr.data-testid]="testdataId() || null"
        [attr.aria-disabled]="disabled() || null"
        [class]="cardClasses()"
        [style]="styleOverride() || null"
      >
        <ng-content />
      </mat-card>
    }
  `,
  styles: `
    .mes-card {
      display: block;
      border-radius: var(--radius-xl);
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
    }

    .mes-card--rounded-lg {
      border-radius: var(--radius-lg);
    }

    .mes-card--rounded-xl {
      border-radius: var(--radius-xl);
    }

    .mes-card--rounded-2xl {
      border-radius: var(--radius-2xl);
    }
  `,
})
export class MesCardComponent implements MesSharedComponent {
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
   * Whether the card is in a disabled state (`false` by default).
   */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Whether the card is hidden from view (`false` by default).
   */
  public readonly hidden: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional custom inline style override (`''` by default).
   */
  public readonly styleOverride: InputSignal<string> = input<string>('');

  /**
   * Corner border radius scale (`'lg'`, `'xl'`, or `'2xl'`).
   */
  public readonly rounded: InputSignal<MesCardRadius> = input<MesCardRadius>('xl');

  /**
   * Visual card appearance variant (`'outlined'`, `'elevated'`, or `'filled'`).
   */
  public readonly variant: InputSignal<MesCardVariant> = input<MesCardVariant>('outlined');

  /**
   * Optional additional CSS classes applied to the inner `<mat-card>` element.
   */
  public readonly cardClass: InputSignal<string> = input<string>('');

  /**
   * Computed CSS class list combining `.m3-card`, radius modifier, and custom classes.
   */
  protected readonly cardClasses: Signal<string> = computed((): string => {
    const classes = ['m3-card', 'mes-card', `mes-card--rounded-${this.rounded()}`];
    if (this.cardClass()) {
      classes.push(this.cardClass());
    }
    return classes.join(' ');
  });
}
