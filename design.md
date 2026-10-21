# Design System & UI Engineering Guidelines (`design.md`)

> [!IMPORTANT]
> **Purpose**: This document establishes the authoritative visual design system, **Light/Dark Color Theme Architecture**, Single `src/styles/styles.scss` structure, Shared UI Component Library (`@ui`) rules, **e-Goods Storefront UI specifications**, and **Storybook** component design standards for the **Angular 22+ & Angular Material (M3)** personal portfolio and resume application.

---

## 1. Visual Identity & Design Principles

1. **First-Class Light & Dark Theme Support (M3)**:
   * **Dark Theme (`.dark-theme` — Default)**: Deep obsidian/slate canvas (`#0d1117` background, `#161b22` elevated surface, `#8ab4f8` primary accent) with soft radial spotlight blooms and topographic SVG contours.
   * **Light Theme (`.light-theme`)**: High-clarity daylight canvas (`#f8fafc` background, `#ffffff` elevated surface, `#1a73e8` primary accent) with calibrated border contrast (`rgba(15, 23, 42, 0.12)`) and subtle ambient tinting.
   * Both themes switch instantaneously at runtime via CSS custom properties and Angular Signals (`ThemeService`) with zero page reload or layout shift.
2. **Tactile Micro-Interactions**:
   * Interactive cards (`.m3-card`) and pills use smooth `250ms cubic-bezier(0.4, 0, 0.2, 1)` transitions, lifting `translateY(-2px)` on hover with a theme-aware primary border highlight (`rgba(var(--theme-primary-rgb), 0.4)`).
3. **Single Stylesheet Source of Truth**:
   * **All styling resides in [`src/styles/styles.scss`](file:///home/gman/Projects/personal-site/src/styles/styles.scss)**.
   * Individual Angular components **must not** define `styleUrl`, `styleUrls`, or inline `styles: [...]` metadata.
4. **Strict Material Encapsulation via `@ui`**:
   * Feature and page components **never import `@angular/material/*` directly**. All Material Design 3 primitives are wrapped inside `src/app/shared/ui/` (imported via `@ui`) and documented in **Storybook** across both Light and Dark themes.

---

## 2. Light & Dark Color Theme Architecture

All components and styles must consume semantic CSS custom properties defined in [`src/styles/styles.scss`](file:///home/gman/Projects/personal-site/src/styles/styles.scss)—never hardcoded hex values (except dynamic external brand colors from [`src/assets/skills.json`](file:///home/gman/Projects/personal-site/src/assets/skills.json)).

### 2.1 Semantic Color Token Matrix (Light vs. Dark)

| Semantic CSS Variable | Dark Theme (`.dark-theme`) | Light Theme (`.light-theme`) | Purpose & Usage |
| :--- | :--- | :--- | :--- |
| `--color-primary` | `#8ab4f8` | `#1a73e8` | Primary accents, active controls, section headings, timeline nodes |
| `--theme-primary-rgb` | `138, 180, 248` | `26, 115, 232` | RGB channels for alpha composition (`rgba(var(--theme-primary-rgb), 0.14)`) |
| `--color-secondary` | `#94a3b8` | `#5f6368` | Secondary tonal chips, tech stack tags, muted icons |
| `--theme-secondary-rgb` | `148, 163, 184` | `95, 99, 104` | RGB channels for secondary spotlight & tonal chip fills |
| `--color-background` | `#0d1117` | `#f8fafc` | Root `<body>` / `<main>` page canvas background |
| `--color-surface` | `#161b22` | `#ffffff` | Card surfaces (`.m3-card`), app bar, navigation drawer |
| `--color-surface-variant` | `#21262d` | `#f1f5f9` | Tonal chip backgrounds, subtle badge/code fills |
| `--color-on-surface` | `#f0f6fc` | `#0f172a` | Raw high-contrast foreground color on surfaces |
| `--theme-on-surface-rgb` | `240, 246, 252` | `15, 23, 42` | RGB channels for text hierarchy opacity scales |
| `--color-border` | `rgba(240, 246, 252, 0.12)` | `rgba(15, 23, 42, 0.12)` | Outlined card borders, section heading hairlines, dividers |
| `--color-text-main` | `rgba(240, 246, 252, 0.92)` | `rgba(15, 23, 42, 0.92)` | Primary headings, body copy, accomplishment bullets |
| `--color-text-muted` | `rgba(240, 246, 252, 0.65)` | `rgba(15, 23, 42, 0.65)` | Subtitles, organization names, metadata labels, scroll hints |
| `--color-success` | `#34d399` | `#16a34a` | Status badge ("Open to Opportunities"), Paid/Verified badges |
| `--shadow-card-hover` | `0 10px 28px -6px rgba(0, 0, 0, 0.35)` | `0 10px 28px -6px rgba(15, 23, 42, 0.10)` | Theme-tuned hover elevation shadow for `.m3-card` |

### 2.2 Angular Material M3 + CSS Custom Property Implementation (`src/styles/styles.scss`)

In Layer 1 & Layer 2 of [`src/styles/styles.scss`](file:///home/gman/Projects/personal-site/src/styles/styles.scss), Angular Material M3 themes and custom tokens are bound to `html.dark-theme` and `html.light-theme`:

```scss
@use '@angular/material' as mat;

@include mat.core();

$dark-m3-theme: mat.define-theme((
  color: (
    theme-type: dark,
    primary: mat.$azure-palette,
    tertiary: mat.$blue-palette,
    use-system-variables: true,
  ),
  typography: (
    brand-family: 'Roboto, sans-serif',
    plain-family: 'Roboto, sans-serif',
  ),
));

$light-m3-theme: mat.define-theme((
  color: (
    theme-type: light,
    primary: mat.$azure-palette,
    tertiary: mat.$blue-palette,
    use-system-variables: true,
  ),
  typography: (
    brand-family: 'Roboto, sans-serif',
    plain-family: 'Roboto, sans-serif',
  ),
));

:root,
html.dark-theme {
  color-scheme: dark;
  @include mat.all-component-themes($dark-m3-theme);

  --theme-primary-rgb: 138, 180, 248;
  --theme-secondary-rgb: 148, 163, 184;
  --theme-on-surface-rgb: 240, 246, 252;
  --theme-border-rgb: 240, 246, 252;

  --color-primary: #8ab4f8;
  --color-secondary: #94a3b8;
  --color-background: #0d1117;
  --color-surface: #161b22;
  --color-surface-variant: #21262d;
  --color-on-surface: #f0f6fc;
  --color-on-background: #f0f6fc;
  --color-border: rgba(var(--theme-border-rgb), 0.12);
  --color-text-main: rgba(var(--theme-on-surface-rgb), 0.92);
  --color-text-muted: rgba(var(--theme-on-surface-rgb), 0.65);
  --color-success: #34d399;
  --shadow-card-hover: 0 10px 28px -6px rgba(0, 0, 0, 0.35);

  --v-theme-primary: var(--theme-primary-rgb);
  --v-theme-secondary: var(--theme-secondary-rgb);
  --v-theme-on-surface: var(--theme-on-surface-rgb);
  --v-border-color: var(--theme-border-rgb);
}

html.light-theme {
  color-scheme: light;
  @include mat.all-component-colors($light-m3-theme);

  --theme-primary-rgb: 26, 115, 232;
  --theme-secondary-rgb: 95, 99, 104;
  --theme-on-surface-rgb: 15, 23, 42;
  --theme-border-rgb: 15, 23, 42;

  --color-primary: #1a73e8;
  --color-secondary: #5f6368;
  --color-background: #f8fafc;
  --color-surface: #ffffff;
  --color-surface-variant: #f1f5f9;
  --color-on-surface: #0f172a;
  --color-on-background: #0f172a;
  --color-border: rgba(var(--theme-border-rgb), 0.12);
  --color-text-main: rgba(var(--theme-on-surface-rgb), 0.92);
  --color-text-muted: rgba(var(--theme-on-surface-rgb), 0.65);
  --color-success: #16a34a;
  --shadow-card-hover: 0 10px 28px -6px rgba(15, 23, 42, 0.10);
}
```

### 2.3 Signal-Based `ThemeService` Specification (`src/app/core/services/theme.service.ts`)

1. **State Signals**:
   * `readonly themeMode = signal<'dark' | 'light'>('dark')`
   * `readonly isDark = computed(() => this.themeMode() === 'dark')`
2. **Initialization & Persistence**:
   * Reads `localStorage.getItem('personal-site-theme')` on startup; defaults to `'dark'`.
   * An Angular `effect()` synchronizes `document.documentElement.classList` (`dark-theme` vs `light-theme`), sets `document.documentElement.style.colorScheme`, and persists changes to `localStorage`.

---

## 3. Typography, Spacing, Radius & Motion Tokens

### 3.1 Spacing Scale (4px Base Grid)
* `--space-1` (`4px`), `--space-2` (`8px`), `--space-3` (`12px`), `--space-4` (`16px`), `--space-5` (`24px`), `--space-6` (`32px`), `--space-8` (`48px`), `--space-10` (`64px`).

### 3.2 Border Radii (Material 3 Shape Scale)
* `--radius-xs` (`4px`), `--radius-sm` (`6px`), `--radius-md` (`8px`), `--radius-lg` (`12px`), `--radius-xl` (`16px`), `--radius-2xl` (`24px`), `--radius-pill` (`9999px`).

### 3.3 Motion & Elevation Tokens
* `--transition-fast`: `150ms cubic-bezier(0.4, 0, 0.2, 1)`
* `--transition-normal`: `250ms cubic-bezier(0.4, 0, 0.2, 1)`
* `--transition-slow`: `350ms cubic-bezier(0.4, 0, 0.2, 1)`

### 3.4 Typography Hierarchy
* **Font Family**: `'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
* **Hero / Page Title (`.hero-title`, `.page-title`, `.poems-title`, `.store-title`)**: `2rem` (`32px`), `font-weight: 800`, `letter-spacing: -0.02em`, `line-height: 1.2`
* **Section Heading (`.section-heading`)**: `1.25rem` (`20px`), `font-weight: 700`, `uppercase`, `letter-spacing: 0.06em`, `color: var(--color-primary)`, with trailing `1px` `var(--color-border)` flex line (`::after`)
* **Card Role / Product Title (`.role-title`, `.product-title`)**: `1.15rem` (`18.4px`), `font-weight: 700`, `letter-spacing: -0.01em`
* **Entity Subtitle (`.entity-subtitle`)**: `0.95rem` (`15.2px`), `font-weight: 500`, `color: var(--color-text-muted)`
* **Body / Accomplishment Bullet (`.resume-bullet-list li`)**: `0.9375rem` (`15px`), `line-height: 1.65`, custom `5px` primary pill bullet (`::before`)

---

## 4. Single `styles.scss` Architecture

[`src/styles/styles.scss`](file:///home/gman/Projects/personal-site/src/styles/styles.scss) is the **only** stylesheet in the application, structured into 7 ordered layers:

```scss
/* ==========================================================================
   1. ANGULAR MATERIAL M3 & MDI ICON INITIALIZATION
   ========================================================================== */
/* ==========================================================================
   2. DESIGN TOKENS & LIGHT/DARK THEME PALETTES (:root, html.dark-theme, html.light-theme)
   ========================================================================== */
/* ==========================================================================
   3. BASE RESET, GLOBAL TYPOGRAPHY & SHARED UTILITY CLASSES
   ========================================================================== */
/* ==========================================================================
   4. AMBIENT TOPOGRAPHIC BACKGROUND & APP SHELL / NAVIGATION
   ========================================================================== */
/* ==========================================================================
   5. SHARED UI COMPONENT LIBRARY (@ui) STYLES
   ========================================================================== */
/* ==========================================================================
   6. FEATURE & PAGE LAYOUT STYLES (Hero, Timeline, Cards, Skills, Poems, Store)
   ========================================================================== */
/* ==========================================================================
   7. PRINT STYLESHEET (@media print)
   ========================================================================== */
```

---

## 5. e-Goods Storefront & Navigation Tab Design (`/store`)

### 5.1 Navigation Tab Integration (`AppNavigationComponent`)
* Primary navigation tabs in the top app bar and mobile drawer:
  * **Resume / Home** (`/`, `mdi-home-outline`)
  * **Store** (`/store`, `mdi-storefront-outline`)
  * **Poems** (`/PoemsPage`, `mdi-feather`)
  * **Books** (`/BooksPage`, `mdi-book-open-outline`)
* Active route tab uses a primary tonal pill indicator (`color="primary"`, `variant="tonal"`).

### 5.2 Storefront Layout & Product Card (`<ui-product-card>`)
* **Category Filter Bar**: Horizontal row of `<ui-chip>` filter pills (`All`, `PDF Guides & eBooks`, `Architecture Templates`, `Poetry Collections`).
* **Product Grid (`.store-grid`)**: Responsive CSS Grid (`1fr` on mobile, `repeat(2, 1fr)` on tablet, `repeat(3, 1fr)` on desktop `>= 1024px`, `gap: var(--space-5)`).
* **`UiProductCardComponent` (`<ui-product-card>`)**:
  * Built on `<ui-card rounded="2xl" class="m3-card product-card">`.
  * **Cover Preview Header**: `16/10` aspect-ratio cover thumbnail with a floating format badge (`PDF • 42 Pages` or `ZIP Bundle`) and price pill (`$19.00`).
  * **Body**: Product title (`.product-title`), concise description, included feature bullets, and action bar (`Preview Sample` secondary button + `Buy Now` primary tonal button with `mdi-lock-check-outline` / `mdi-cart-arrow-right`).
* **Post-Purchase Fulfillment Card (`/store/success`)**:
  * Displays verified order status (`--color-success`), customer email confirmation, remaining download count badge (`3 of 3 downloads remaining`), expiration timer, and a primary `Download e-Good` button backed by the signed backend token.

---

## 6. Shared UI Component Library (`@ui`) & Storybook Standards

### 6.1 Architectural Boundary
Feature components (`src/app/features/**`) **must never import `@angular/material/*` directly**. They only consume `@ui` components (`src/app/shared/ui/index.ts`), which are styled by `src/styles/styles.scss` and documented in **Storybook**.

### 6.2 Required Storybook Stories Catalog (`src/app/shared/ui/`)
| Component | Selector | Story File | Key States / Variants Covered in Storybook |
| :--- | :--- | :--- | :--- |
| `UiCardComponent` | `<ui-card>` | `ui-card.component.stories.ts` | Outlined M3 surface (Dark & Light), `xl` / `2xl` radius, hover elevation, header/body/footer slots |
| `UiChipComponent` | `<ui-chip>` | `ui-chip.component.stories.ts` | Tonal, elevated, outlined, sizes (`x-small`, `small`, `medium`), `prependIcon`, anchor `href` |
| `UiButtonComponent` | `<ui-button>` | `ui-button.component.stories.ts` | Tonal, text, outlined, primary/secondary, `prependIcon`, download link |
| `UiIconButtonComponent` | `<ui-icon-button>` | `ui-icon-button.component.stories.ts` | Social icon links, theme toggle icon button (`mdi-weather-sunny` / `mdi-weather-night`), required `ariaLabel` |
| `UiIconComponent` | `<ui-icon>` | `ui-icon.component.stories.ts` | `mdi-*` icon gallery, custom pixel sizes (`14px`–`32px`), semantic colors |
| `UiButtonToggleComponent` | `<ui-button-toggle>` | `ui-button-toggle.component.stories.ts` | Timeline vs Cards switcher with two-way `model()` signal binding |
| `UiTimelineComponent` | `<ui-timeline>` | `ui-timeline.component.stories.ts` | Horizontal scroll track, node dots, opposite date pills, left/right edge-glow indicators |
| `UiToolbarComponent` & `UiDrawerComponent` | `<ui-toolbar>`, `<ui-drawer>` | `ui-toolbar.component.stories.ts` | App bar with banner overlay, navigation tabs (`Home`, `Store`, `Poems`), mobile drawer |
| `UiProductCardComponent` | `<ui-product-card>` | `ui-product-card.component.stories.ts` | Digital PDF/e-good product card, price badge, format chip, loading/checkout state in Dark & Light mode |
| `UiAvatarComponent`, `UiDividerComponent`, `UiSpinnerComponent` | `<ui-avatar>`, `<ui-divider>`, `<ui-spinner>` | `ui-primitives.stories.ts` | Tonal avatar, subtle divider, indeterminate loading state |
| `SkillPillComponent` | `<ui-skill-pill>` | `skill-pill.component.stories.ts` | Brand hex color pills (`.NET`, `TypeScript`, `Angular`, `Kubernetes`) in Dark & Light mode |
| `HeadingComponent` | `<ui-heading>` | `heading.component.stories.ts` | `h1`–`h6` scale with and without primary underline |
| `ResumeDownloadBtnComponent` | `<ui-resume-download-btn>` | `resume-download-btn.component.stories.ts` | Direct PDF download trigger |
| `VideoPreviewWrapperComponent` & `IFrameContainerComponent` | `<ui-video-preview-wrapper>`, `<ui-iframe-container>` | `video-preview-wrapper.component.stories.ts` | Collapsed thumbnail trigger, expanded floating YouTube modal, outside-click close |

---

## 7. Responsive Breakpoints & Print Fidelity

* **Mobile (`< 600px`)**: Single-column layouts; mobile drawer navigation; compact horizontal timeline columns (`290px` track, `340px` card width).
* **Tablet (`600px – 959px`)**: 2-column store grid; desktop navigation tabs; row-aligned `.hero-body` at `768px`.
* **Desktop (`>= 960px`)**: 2-column `.cards-grid`, 3-column `.store-grid`, full horizontal timeline (`462px` track, `740px` card width).
* **Print (`@media print`)**: Forces `#ffffff` background and `#111111` text at `12pt`; hides `.ambient-background`, `.no-print`, `.m3-app-bar`, `.mat-drawer`, `.view-toggle-row`, and `.edge-glow`.
