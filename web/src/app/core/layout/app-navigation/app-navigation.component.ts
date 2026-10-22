import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  MesAvatarComponent,
  MesButtonComponent,
  MesDrawerComponent,
  MesIconButtonComponent,
  MesIconComponent,
  MesToolbarComponent,
} from '@ui';
import type { NavigationLink } from '../../models/portfolio.model';
import { ResumeService } from '../../services/resume.service';
import { ThemeService } from '../../services/theme.service';

/**
 * Primary application navigation bar and responsive mobile drawer (`<app-navigation>`).
 *
 * @remarks
 * Consumes `@ui` (`<mes-toolbar>`, `<mes-drawer>`, `<mes-avatar>`, `<mes-icon>`,
 * `<mes-icon-button>`, `<mes-button>`), {@link ThemeService}, and {@link ResumeService}.
 * Renders the banner overlay, brand identity, primary route tabs (`Home`, `Store`, `Poems`, `Books`),
 * social profile links, Light/Dark theme toggle, and direct Resume PDF download button.
 */
@Component({
  selector: 'app-navigation',
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    MesToolbarComponent,
    MesDrawerComponent,
    MesAvatarComponent,
    MesIconComponent,
    MesIconButtonComponent,
    MesButtonComponent,
  ],
  styles: `
    .m3-app-bar {
      position: relative;
      overflow: hidden;
    }

    .banner-overlay {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.15;
      pointer-events: none;
    }

    .nav-mobile-toggle {
      display: inline-flex;

      @media (min-width: 768px) {
        display: none;
      }
    }

    .brand-identity {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
      min-width: 0;
      z-index: 1;
    }

    .brand-avatar {
      margin-left: var(--space-1);
      margin-right: var(--space-3);
      flex-shrink: 0;
    }

    .brand-title {
      display: flex;
      align-items: center;
      font-size: 1.05rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .brand-name {
      color: var(--color-text-main);
    }

    .brand-separator {
      display: none;
      margin: 0 var(--space-2);
      opacity: 0.5;
      color: var(--color-text-muted);

      @media (min-width: 960px) {
        display: inline;
      }
    }

    .brand-tagline {
      display: none;
      font-size: 0.75rem;
      font-weight: 500;
      opacity: 0.8;
      color: var(--color-text-muted);

      @media (min-width: 960px) {
        display: inline;
      }
    }

    .nav-spacer {
      flex: 1 1 auto;
    }

    .nav-tabs {
      display: none;
      align-items: center;
      gap: var(--space-1);
      margin-right: var(--space-3);
      z-index: 1;

      @media (min-width: 768px) {
        display: flex;
      }
    }

    .nav-tab-link {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      padding: 0.4rem 0.85rem;
      border-radius: var(--radius-pill);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-muted);
      text-decoration: none;
      transition:
        background-color var(--transition-fast),
        color var(--transition-fast);

      &:hover {
        color: var(--color-text-main);
        background-color: rgba(var(--theme-primary-rgb), 0.08);
      }

      &.nav-tab-link--active {
        color: var(--color-primary);
        background-color: rgba(var(--theme-primary-rgb), 0.14);
        font-weight: 600;
      }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: var(--space-1);
      z-index: 1;
    }

    .nav-resume-btn {
      margin-left: var(--space-2);
      font-weight: 500;
      display: none;

      @media (min-width: 600px) {
        display: inline-flex;
      }
    }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: var(--space-3);
      margin-bottom: var(--space-3);
      border-bottom: 1px solid var(--color-border);
    }

    .drawer-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--color-text-main);
    }

    .drawer-nav-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .drawer-nav-link {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: 0.65rem 0.85rem;
      border-radius: var(--radius-lg);
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--color-text-main);
      text-decoration: none;
      transition: background-color var(--transition-fast);

      &:hover {
        background-color: rgba(var(--theme-primary-rgb), 0.08);
      }

      &.drawer-nav-link--active {
        color: var(--color-primary);
        background-color: rgba(var(--theme-primary-rgb), 0.14);
        font-weight: 600;
      }
    }
  `,
  template: `
    <mes-toolbar class="m3-app-bar no-print" testdataId="app-navigation-toolbar">
      <img
        ngSrc="/assets/banner.png"
        alt=""
        fill
        priority
        class="banner-overlay"
        aria-hidden="true"
      />

      @if (links().length > 1) {
        <mes-icon-button
          class="nav-mobile-toggle"
          icon="mdi-menu"
          ariaLabel="Toggle navigation menu"
          testdataId="nav-drawer-toggle"
          (clicked)="toggleDrawer()"
        />
      }

      <a routerLink="/" class="brand-identity" aria-label="Manuel Saleta Home">
        <mes-avatar [size]="36" avatarClass="brand-avatar" testdataId="nav-brand-avatar">
          <mes-icon icon="mdi-code-braces" [size]="20" />
        </mes-avatar>
        <div class="brand-title">
          <span class="brand-name">Manuel Saleta</span>
          <span class="brand-separator" aria-hidden="true">|</span>
          <span class="brand-tagline">Let's build something great together</span>
        </div>
      </a>

      <span class="nav-spacer" aria-hidden="true"></span>

      <nav class="nav-tabs" aria-label="Primary navigation">
        @for (link of links(); track link.to) {
          <a
            [routerLink]="link.to"
            routerLinkActive="nav-tab-link--active"
            [routerLinkActiveOptions]="{ exact: link.exact }"
            class="nav-tab-link"
          >
            <mes-icon [icon]="link.icon" [size]="18" />
            <span>{{ link.label }}</span>
          </a>
        }
      </nav>

      <div class="nav-actions">
        <mes-icon-button
          icon="mdi-github"
          href="https://github.com/ManuelSaleta"
          target="_blank"
          ariaLabel="GitHub Profile"
          testdataId="nav-github-btn"
        />

        <mes-icon-button
          icon="mdi-linkedin"
          href="https://www.linkedin.com/in/manuelsaleta/"
          target="_blank"
          ariaLabel="LinkedIn Profile"
          testdataId="nav-linkedin-btn"
        />

        <mes-icon-button
          [icon]="themeService.isDark() ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          ariaLabel="Toggle Theme"
          testdataId="nav-theme-toggle-btn"
          (clicked)="themeService.toggleTheme()"
        />

        <mes-button
          [href]="resumeService.resumePdfUrl()"
          download="Manuel_Saleta_Resume.pdf"
          target="_blank"
          variant="tonal"
          size="small"
          prependIcon="mdi-download"
          buttonClass="nav-resume-btn"
          testdataId="nav-resume-download-btn"
        >
          Resume PDF
        </mes-button>
      </div>
    </mes-toolbar>

    <mes-drawer
      [(opened)]="drawerOpened"
      [links]="links()"
      ariaLabel="Mobile navigation menu"
      testdataId="nav-mobile-drawer"
    />
  `,
})
export class AppNavigationComponent {
  /**
   * Injected singleton {@link ThemeService} controlling Dark/Light theme state.
   */
  public readonly themeService = inject(ThemeService);

  /**
   * Injected singleton {@link ResumeService} providing static resume PDF path.
   */
  public readonly resumeService = inject(ResumeService);

  /**
   * Reactive open/closed state of the mobile slide-over navigation drawer.
   */
  public readonly drawerOpened = signal<boolean>(false);

  /**
   * Read-only signal of top-level navigation links (`Home`, `Store`, `Poems`, `Books`).
   */
  public readonly links = signal<readonly NavigationLink[]>([
    { label: 'Home', to: '/', icon: 'mdi-home-outline', exact: true },
    { label: 'Store', to: '/store', icon: 'mdi-shopping-outline', exact: false },
    { label: 'Poems', to: '/PoemsPage', icon: 'mdi-feather', exact: false },
    { label: 'Books', to: '/BooksPage', icon: 'mdi-book-open-outline', exact: false },
  ]).asReadonly();

  /**
   * Toggles the mobile navigation drawer open or closed.
   */
  public toggleDrawer(): void {
    this.drawerOpened.update((open) => !open);
  }

  /**
   * Closes the mobile navigation drawer.
   */
  public closeDrawer(): void {
    this.drawerOpened.set(false);
  }
}
