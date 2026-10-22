import {
  Component,
  computed,
  input,
  type InputSignal,
  type InputSignalWithTransform,
  type Signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { trimmed, type MesSharedComponent } from './contracts/shared_component';

/**
 * Generic Material Design Icon (`@mdi/font`) wrapper component (`<mes-icon>`).
 *
 * @remarks
 * Implements {@link MesSharedComponent} and renders `<i class="mdi ...">` glyphs sized and
 * colored via reactive signals, keeping `aria-hidden="true"` unless `ariaLabel` is provided.
 */
@Component({
  selector: 'mes-icon',
  imports: [MatIconModule],
  template: `
    @if (!hidden()) {
      <i
        [attr.id]="id() || null"
        [attr.data-testid]="testdataId() || null"
        [attr.aria-disabled]="disabled() || null"
        [class]="iconClasses()"
        [style.font-size.px]="size()"
        [style.width.px]="size()"
        [style.height.px]="size()"
        [style.color]="resolvedColor()"
        [style]="styleOverride() || null"
        [attr.aria-hidden]="ariaLabel() ? null : 'true'"
        [attr.aria-label]="ariaLabel() || null"
        [attr.role]="ariaLabel() ? 'img' : null"
      ></i>
    }
  `,
  styles: `
    .mes-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
  `,
})
export class MesIconComponent implements MesSharedComponent {
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
   * Whether the icon is in a disabled state (`false` by default).
   */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Whether the icon is hidden from view (`false` by default).
   */
  public readonly hidden: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional custom inline style override (`''` by default).
   */
  public readonly styleOverride: InputSignal<string> = input<string>('');

  /**
   * Material Design Icon name (e.g., `'mdi-briefcase-outline'` or `'briefcase-outline'`).
   */
  public readonly icon: InputSignal<string> = input.required<string>();

  /**
   * Icon glyph size in pixels (`20` by default).
   */
  public readonly size: InputSignal<number> = input<number>(20);

  /**
   * Optional semantic color (`'primary'`, `'secondary'`, `'success'`, `'white'`) or CSS color value.
   */
  public readonly color: InputSignal<string | undefined> = input<string | undefined>(undefined);

  /**
   * Optional accessible label when the icon conveys standalone semantic meaning.
   */
  public readonly ariaLabel: InputSignal<string | undefined> = input<string | undefined>(undefined);

  /**
   * Additional CSS class names applied to the icon element.
   */
  public readonly iconClass: InputSignal<string> = input<string>('');

  /**
   * Normalized MDI CSS class string (`mdi mdi-<name>`).
   */
  protected readonly iconClasses: Signal<string> = computed((): string => {
    const raw = this.icon().trim();
    const mdiName = raw.startsWith('mdi-') ? raw : `mdi-${raw}`;
    const classes = ['mes-icon', 'mdi', mdiName];
    if (this.iconClass()) {
      classes.push(this.iconClass());
    }
    return classes.join(' ');
  });

  /**
   * Resolved CSS color string from semantic token names or direct CSS colors.
   */
  protected readonly resolvedColor: Signal<string | null> = computed((): string | null => {
    const c = this.color();
    if (!c) {
      return null;
    }
    switch (c) {
      case 'primary':
        return 'var(--color-primary)';
      case 'secondary':
        return 'var(--color-secondary)';
      case 'success':
        return 'var(--color-success)';
      default:
        return c;
    }
  });
}
