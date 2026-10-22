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
import { MatChipsModule } from '@angular/material/chips';
import { trimmed, type MesSharedComponent } from './contracts/shared_component';
import { MesIconComponent } from './mes-icon.component';

/**
 * Supported size variants for {@link MesChipComponent}.
 */
export type MesChipSize = 'x-small' | 'small' | 'medium';

/**
 * Supported visual variants for {@link MesChipComponent}.
 */
export type MesChipVariant = 'tonal' | 'elevated' | 'outlined';

/**
 * Generic Material Design 3 chip / pill component (`<mes-chip>`).
 *
 * @remarks
 * Implements {@link MesSharedComponent} and supports semantic theme colors (`'primary'`, `'secondary'`, `'success'`)
 * as well as arbitrary hex brand colors (`#RRGGBB`), rendering an accessible `<a>` link when `href`
 * is provided, an interactive `<button>` when `interactive` is `true`, or a static pill `<span>`.
 */
@Component({
  selector: 'mes-chip',
  imports: [MatChipsModule, MesIconComponent],
  template: `
    @if (!hidden()) {
      @if (href()) {
        <a
          [attr.id]="id() || null"
          [attr.data-testid]="testdataId() || null"
          [href]="href()"
          [target]="target()"
          [rel]="target() === '_blank' ? 'noopener noreferrer' : null"
          [class]="chipClasses()"
          [style]="computedStyles()"
          [attr.aria-disabled]="disabled() || null"
          (click)="handleClick($event)"
        >
          @if (normalizedPrependIcon()) {
            <mes-icon [icon]="normalizedPrependIcon()!" [size]="iconSize()" />
          }
          <span class="mes-chip__label"
            ><ng-content>{{ text() }}</ng-content></span
          >
        </a>
      } @else if (interactive()) {
        <button
          type="button"
          [attr.id]="id() || null"
          [attr.data-testid]="testdataId() || null"
          [disabled]="disabled()"
          [class]="chipClasses()"
          [style]="computedStyles()"
          [attr.aria-pressed]="selected()"
          (click)="handleClick($event)"
        >
          @if (normalizedPrependIcon()) {
            <mes-icon [icon]="normalizedPrependIcon()!" [size]="iconSize()" />
          }
          <span class="mes-chip__label"
            ><ng-content>{{ text() }}</ng-content></span
          >
        </button>
      } @else {
        <span
          [attr.id]="id() || null"
          [attr.data-testid]="testdataId() || null"
          [attr.aria-disabled]="disabled() || null"
          [class]="chipClasses()"
          [style]="computedStyles()"
        >
          @if (normalizedPrependIcon()) {
            <mes-icon [icon]="normalizedPrependIcon()!" [size]="iconSize()" />
          }
          <span class="mes-chip__label"
            ><ng-content>{{ text() }}</ng-content></span
          >
        </span>
      }
    }
  `,
  styles: `
    .mes-chip {
      display: inline-flex;
      align-items: center;
      gap: var(--space-1);
      border-radius: var(--radius-pill);
      font-weight: 500;
      text-decoration: none;
      line-height: 1.2;
      transition:
        transform var(--transition-fast),
        box-shadow var(--transition-fast),
        background-color var(--transition-fast),
        border-color var(--transition-fast);
    }

    .mes-chip--x-small {
      font-size: 0.72rem;
      padding: 0.15rem 0.5rem;
    }

    .mes-chip--small {
      font-size: 0.8rem;
      padding: 0.25rem 0.65rem;
    }

    .mes-chip--medium {
      font-size: 0.875rem;
      padding: 0.35rem 0.85rem;
    }

    .mes-chip--tonal-primary {
      background-color: rgba(var(--theme-primary-rgb), 0.14);
      color: var(--color-primary);
      border: 1px solid rgba(var(--theme-primary-rgb), 0.24);
    }

    .mes-chip--tonal-secondary {
      background-color: rgba(var(--theme-secondary-rgb), 0.14);
      color: var(--color-secondary);
      border: 1px solid rgba(var(--theme-secondary-rgb), 0.24);
    }

    .mes-chip--tonal-success {
      background-color: color-mix(in srgb, var(--color-success) 15%, transparent);
      color: var(--color-success);
      border: 1px solid color-mix(in srgb, var(--color-success) 30%, transparent);
    }
  `,
})
export class MesChipComponent implements MesSharedComponent {
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
   * Whether the chip is in a disabled, non-interactive state (`false` by default).
   */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Whether the chip is hidden from view (`false` by default).
   */
  public readonly hidden: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional custom inline style override (`''` by default).
   */
  public readonly styleOverride: InputSignal<string> = input<string>('');

  /**
   * Optional fallback text label when no `<ng-content>` is projected.
   */
  public readonly text: InputSignal<string> = input<string>('');

  /**
   * Semantic color token (`'primary'`, `'secondary'`, `'success'`) or hex brand color (`#RRGGBB`).
   */
  public readonly color: InputSignal<string> = input<string>('primary');

  /**
   * Visual variant (`'tonal'`, `'elevated'`, or `'outlined'`).
   */
  public readonly variant: InputSignal<MesChipVariant> = input<MesChipVariant>('tonal');

  /**
   * Size scale (`'x-small'`, `'small'`, or `'medium'`).
   */
  public readonly size: InputSignal<MesChipSize> = input<MesChipSize>('small');

  /**
   * Optional Material Design Icon name (with or without `'mdi-'` prefix) rendered before the label.
   */
  public readonly prependIcon: InputSignal<string | undefined> = input<string | undefined>(
    undefined,
  );

  /**
   * Optional external or internal URL. When provided, renders an `<a>` pill link.
   */
  public readonly href: InputSignal<string | undefined> = input<string | undefined>(undefined);

  /**
   * Anchor target attribute when `href` is set (`'_blank'` by default).
   */
  public readonly target: InputSignal<string> = input<string>('_blank');

  /**
   * Whether the chip acts as an interactive filter/toggle button when `href` is not set.
   */
  public readonly interactive: InputSignal<boolean> = input<boolean>(false);

  /**
   * Whether the interactive chip is currently selected.
   */
  public readonly selected: InputSignal<boolean> = input<boolean>(false);

  /**
   * Additional CSS classes to apply to the rendered chip element.
   */
  public readonly chipClass: InputSignal<string> = input<string>('');

  /**
   * Emits the native `MouseEvent` when the chip is clicked.
   */
  public readonly clicked: OutputEmitterRef<MouseEvent> = output<MouseEvent>();

  /**
   * Normalized MDI icon name prefixed with `'mdi-'`.
   */
  protected readonly normalizedPrependIcon: Signal<string | undefined> = computed(
    (): string | undefined => {
      const raw = this.prependIcon()?.trim();
      if (!raw) {
        return undefined;
      }
      return raw.startsWith('mdi-') ? raw : `mdi-${raw}`;
    },
  );

  /**
   * Computed icon size in pixels matching the chip's size scale.
   */
  protected readonly iconSize: Signal<number> = computed((): number => {
    switch (this.size()) {
      case 'x-small':
        return 12;
      case 'small':
        return 14;
      case 'medium':
        return 16;
    }
  });

  /**
   * Computed CSS class list for the chip element.
   */
  protected readonly chipClasses: Signal<string> = computed((): string => {
    const classes = ['mes-chip', `mes-chip--${this.size()}`];
    const colorValue = this.color();
    if (colorValue === 'primary' || colorValue === 'secondary' || colorValue === 'success') {
      classes.push(`mes-chip--tonal-${colorValue}`);
    }
    if (this.chipClass()) {
      classes.push(this.chipClass());
    }
    return classes.join(' ');
  });

  /**
   * Computed inline style string supporting dynamic hex brand colors and `styleOverride`.
   */
  protected readonly computedStyles: Signal<string | null> = computed((): string | null => {
    const styles: string[] = [];
    const colorValue = this.color();
    if (colorValue.startsWith('#')) {
      styles.push(`background-color: color-mix(in srgb, ${colorValue} 18%, var(--color-surface))`);
      styles.push(`border: 1px solid color-mix(in srgb, ${colorValue} 45%, transparent)`);
      styles.push(`color: var(--color-text-main)`);
    }
    if (this.styleOverride()) {
      styles.push(this.styleOverride());
    }
    return styles.length > 0 ? styles.join('; ') : null;
  });

  /**
   * Handles click events and emits {@link clicked} when not disabled.
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
