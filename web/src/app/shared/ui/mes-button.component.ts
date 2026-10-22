import {
  Component,
  computed,
  input,
  output,
  type InputSignal,
  type InputSignalWithTransform,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { trimmed, type MesSharedComponent } from './contracts/shared_component';
import { MesIconComponent } from './mes-icon.component';

/**
 * Supported visual variants for {@link MesButtonComponent}.
 */
export type MesButtonVariant = 'tonal' | 'text' | 'outlined' | 'elevated';

/**
 * Supported size scales for {@link MesButtonComponent}.
 */
export type MesButtonSize = 'small' | 'medium' | 'large';

/**
 * Generic Material Design 3 button wrapper component (`<mes-button>`).
 *
 * @remarks
 * Implements {@link MesSharedComponent} and wraps Angular Material `MatButtonModule`,
 * rendering either an `<a>` link (with optional `download` attribute) or a `<button>` element.
 */
@Component({
  selector: 'mes-button',
  imports: [MatButtonModule, MesIconComponent],
  template: `
    @if (!hidden()) {
      @if (href()) {
        <a
          mat-button
          [attr.id]="id() || null"
          [attr.data-testid]="testdataId() || null"
          [href]="href()"
          [attr.download]="download() || null"
          [target]="target()"
          [rel]="target() === '_blank' ? 'noopener noreferrer' : null"
          [class]="buttonClasses()"
          [style]="styleOverride() || null"
          [attr.aria-label]="ariaLabel() || null"
          [attr.aria-disabled]="disabled() || null"
          (click)="handleClick($event)"
        >
          @if (prependIcon()) {
            <mes-icon [icon]="prependIcon()!" [size]="16" />
          }
          <span class="mes-button__label"><ng-content /></span>
        </a>
      } @else {
        <button
          mat-button
          [attr.id]="id() || null"
          [attr.data-testid]="testdataId() || null"
          [type]="type()"
          [disabled]="disabled()"
          [class]="buttonClasses()"
          [style]="styleOverride() || null"
          [attr.aria-label]="ariaLabel() || null"
          (click)="handleClick($event)"
        >
          @if (prependIcon()) {
            <mes-icon [icon]="prependIcon()!" [size]="16" />
          }
          <span class="mes-button__label"><ng-content /></span>
        </button>
      }
    }
  `,
  styles: `
    .mes-button {
      display: inline-flex;
      align-items: center;
      gap: var(--space-1);
      font-weight: 500;
    }

    .mes-button__label {
      display: inline-flex;
      align-items: center;
    }
  `,
})
export class MesButtonComponent implements MesSharedComponent {
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
   * Whether the button is in a disabled, non-interactive state (`false` by default).
   */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Whether the button is hidden from view (`false` by default).
   */
  public readonly hidden: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional custom inline style override (`''` by default).
   */
  public readonly styleOverride: InputSignal<string> = input<string>('');

  /**
   * Visual button variant (`'tonal'`, `'text'`, `'outlined'`, or `'elevated'`).
   */
  public readonly variant: InputSignal<MesButtonVariant> = input<MesButtonVariant>('tonal');

  /**
   * Semantic color token (`'primary'`, `'secondary'`, or `'success'`).
   */
  public readonly color: InputSignal<string> = input<string>('primary');

  /**
   * Button size scale (`'small'`, `'medium'`, or `'large'`).
   */
  public readonly size: InputSignal<MesButtonSize> = input<MesButtonSize>('medium');

  /**
   * Optional Material Design Icon name rendered before the button label.
   */
  public readonly prependIcon: InputSignal<string | undefined> = input<string | undefined>(
    undefined,
  );

  /**
   * Optional URL to navigate to or download when clicked.
   */
  public readonly href: InputSignal<string | undefined> = input<string | undefined>(undefined);

  /**
   * Optional file download name when `href` points to a downloadable asset.
   */
  public readonly download: InputSignal<string | undefined> = input<string | undefined>(undefined);

  /**
   * Anchor target attribute when `href` is set (`'_blank'` by default).
   */
  public readonly target: InputSignal<string> = input<string>('_blank');

  /**
   * Native button `type` attribute when rendered as `<button>`.
   */
  public readonly type: InputSignal<'button' | 'submit' | 'reset'> = input<
    'button' | 'submit' | 'reset'
  >('button');

  /**
   * Optional accessible label (`aria-label`).
   */
  public readonly ariaLabel: InputSignal<string | undefined> = input<string | undefined>(undefined);

  /**
   * Additional CSS classes applied to the rendered button or link.
   */
  public readonly buttonClass: InputSignal<string> = input<string>('');

  /**
   * Emits the native `MouseEvent` when activated.
   */
  public readonly clicked: OutputEmitterRef<MouseEvent> = output<MouseEvent>();

  /**
   * Computed CSS classes for the button element.
   */
  protected readonly buttonClasses: Signal<string> = computed((): string => {
    const classes = [
      'mes-button',
      `mes-button--${this.variant()}`,
      `mes-button--${this.color()}`,
      `mes-button--${this.size()}`,
    ];
    if (this.buttonClass()) {
      classes.push(this.buttonClass());
    }
    return classes.join(' ');
  });

  /**
   * Emits {@link clicked} when the button is not disabled.
   *
   * @param event - Native click event.
   */
  protected handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.clicked.emit(event);
  }
}
