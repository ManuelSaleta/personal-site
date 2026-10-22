import { Component, input, type InputSignal, type InputSignalWithTransform } from '@angular/core';
import { trimmed, type MesSharedComponent } from './contracts/shared_component';

/**
 * Generic Material Design 3 circular tonal avatar wrapper component (`<mes-avatar>`).
 *
 * @remarks
 * Implements {@link MesSharedComponent}.
 */
@Component({
  selector: 'mes-avatar',
  template: `
    @if (!hidden()) {
      <div
        class="mes-avatar"
        [attr.id]="id() || null"
        [attr.data-testid]="testdataId() || null"
        [attr.aria-disabled]="disabled() || null"
        [class]="avatarClass()"
        [style.width.px]="size()"
        [style.height.px]="size()"
        [style]="styleOverride() || null"
      >
        <ng-content />
      </div>
    }
  `,
  styles: `
    .mes-avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-pill);
      background-color: rgba(var(--theme-primary-rgb), 0.14);
      color: var(--color-primary);
      flex-shrink: 0;
    }
  `,
})
export class MesAvatarComponent implements MesSharedComponent {
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
   * Whether the avatar is in a disabled state (`false` by default).
   */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Whether the avatar is hidden from view (`false` by default).
   */
  public readonly hidden: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional custom inline style override (`''` by default).
   */
  public readonly styleOverride: InputSignal<string> = input<string>('');

  /**
   * Avatar diameter in pixels (`36` by default).
   */
  public readonly size: InputSignal<number> = input<number>(36);

  /**
   * Semantic color token (`'primary'` or `'secondary'`).
   */
  public readonly color: InputSignal<string> = input<string>('primary');

  /**
   * Additional CSS class names applied to the avatar container.
   */
  public readonly avatarClass: InputSignal<string> = input<string>('');
}
