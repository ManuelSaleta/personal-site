import {
  Component,
  input,
  model,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { trimmed, type MesSharedComponent } from './contracts/shared_component';
import { MesIconComponent } from './mes-icon.component';

/**
 * Navigation item contract rendered inside {@link MesDrawerComponent}.
 */
export interface MesDrawerNavLink {
  /** Human-readable route label. */
  readonly label: string;
  /** Router path target (e.g., `'/'`, `'/store'`). */
  readonly to: string;
  /** Material Design Icon name (e.g., `'mdi-home-outline'`). */
  readonly icon: string;
}

/**
 * Generic Material Design 3 temporary navigation drawer wrapper (`<mes-drawer>`).
 *
 * @remarks
 * Implements {@link MesSharedComponent} and uses a two-way `opened` model signal (`[(opened)]`)
 * to control drawer visibility.
 */
@Component({
  selector: 'mes-drawer',
  imports: [MatSidenavModule, MatListModule, RouterLink, RouterLinkActive, MesIconComponent],
  template: `
    @if (!hidden() && opened()) {
      <div class="mes-drawer-backdrop" aria-hidden="true" (click)="closeDrawer()"></div>
      <nav
        class="m3-card mes-drawer-panel"
        [attr.id]="id() || null"
        [attr.data-testid]="testdataId() || null"
        [attr.aria-disabled]="disabled() || null"
        [attr.aria-label]="ariaLabel()"
        [style]="styleOverride() || null"
      >
        <mat-nav-list [disabled]="disabled()">
          @for (link of links(); track link.to) {
            <a
              mat-list-item
              [routerLink]="link.to"
              routerLinkActive="active-nav-link"
              [routerLinkActiveOptions]="{ exact: link.to === '/' }"
              (click)="closeDrawer()"
            >
              <mes-icon [icon]="link.icon" [size]="20" />
              <span class="mes-drawer-link-label">{{ link.label }}</span>
            </a>
          }
        </mat-nav-list>
        <ng-content />
      </nav>
    }
  `,
  styles: `
    .mes-drawer-backdrop {
      position: fixed;
      inset: 0;
      z-index: 30;
      background: rgba(0, 0, 0, 0.45);
    }

    .mes-drawer-panel {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: 260px;
      z-index: 31;
      padding: var(--space-4);
    }

    .mes-drawer-link-label {
      margin-left: var(--space-3);
    }
  `,
})
export class MesDrawerComponent implements MesSharedComponent {
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
   * Whether the drawer is in a disabled, non-interactive state (`false` by default).
   */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Whether the drawer is hidden from view (`false` by default).
   */
  public readonly hidden: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional custom inline style override (`''` by default).
   */
  public readonly styleOverride: InputSignal<string> = input<string>('');

  /**
   * Two-way bound open state of the navigation drawer (`[(opened)]`).
   */
  public readonly opened: ModelSignal<boolean> = model<boolean>(false);

  /**
   * Navigation links displayed inside the drawer list.
   */
  public readonly links: InputSignal<readonly MesDrawerNavLink[]> = input<
    readonly MesDrawerNavLink[]
  >([]);

  /**
   * Accessible label for the `<nav>` drawer container.
   */
  public readonly ariaLabel: InputSignal<string> = input<string>('Mobile navigation menu');

  /**
   * Closes the navigation drawer by setting {@link opened} to `false`.
   */
  public closeDrawer(): void {
    this.opened.set(false);
  }
}
