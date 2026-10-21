# Project Agent Instructions & Best Practices (`AGENTS.md`)

You are an expert in TypeScript, Angular 22+, .NET 10, PostgreSQL 17, and scalable full-stack web application development. You write functional, maintainable, performant, and accessible code following modern engineering best practices.

## Modular Workspace Rules (`.agents/rules/`) & Architecture Specs

Always follow the stack-specific best practices and architectural specs linked below:
- **Frontend (Angular 22+ & TypeScript)**: [`.agents/rules/angular-best-practices.md`](.agents/rules/angular-best-practices.md)
- **Backend (.NET 10 & C# 14 Modular-Monolith Minimal API)**: [`.agents/rules/dot-net-best-practices.md`](.agents/rules/dot-net-best-practices.md)
- **Database (PostgreSQL 17 & EF Core 10 / Npgsql)**: [`.agents/rules/postgres-best-practices.md`](.agents/rules/postgres-best-practices.md)
- **Migration & Full-Stack Execution Plan**: [`plan.md`](plan.md)
- **Design System & UI Engineering Guidelines**: [`design.md`](design.md)

## TypeScript, Modern JS (MDN / State of JS) & JSDoc/TSDoc Best Practices

- **Strict Compiler & Type Safety**:
  - Enforce `"strict": true`, `"noImplicitOverride": true`, `"noPropertyAccessFromIndexSignature": true`, `"noUncheckedIndexedAccess": true`, `"exactOptionalPropertyTypes": true`, `"noFallthroughCasesInSwitch": true`, `"noImplicitReturns": true`, `"verbatimModuleSyntax": true`, and `"strictTemplates": true`.
  - Avoid the `any` type; use `unknown` with explicit type narrowing (`typeof`, `instanceof`, or type predicates) when a type is uncertain.
  - Prefer type inference for obvious local variables, but **always** provide explicit parameter and return types on exported functions, public service methods, and API boundaries.
  - Use `import type { ... }` (enforced by `verbatimModuleSyntax`) for type-only imports so they are cleanly elided at build time.
  - Leverage `as const` and the `satisfies` operator to validate static configurations/records while preserving narrow literal types.
- **JSDoc / TSDoc Documentation Standard (Mandatory)**:
  - Every exported class, component, service, interface, type alias, constant, and public method/signal **MUST** include a concise, informative JSDoc/TSDoc comment block (`/** ... */`).
  - Document **intent, architectural role, edge cases, and accessibility behavior**—do not repeat redundant TypeScript type annotations inside `@param` or `@returns` tags (follow TSDoc conventions: `@param name - Description`, `@returns Description`, `@remarks`, `@example`).
- **Modern ECMAScript (ES2024+ / MDN) Conventions**:
  - Always use `const` by default; use `let` only when reassignment is required; never use `var`.
  - Prefer non-mutating array/collection methods (`toSorted()`, `toReversed()`, `toSpliced()`, `findLast()`, `Object.groupBy()`) to keep state transformations pure.
  - Always use strict equality (`===` and `!==`), optional chaining (`?.`), and nullish coalescing (`??`) over loose truthy/falsy fallbacks (`||`) that break on `0` or `""`.
  - Prefer `async`/`await` with `try`/`catch` over raw `.then()` promise chains, and use `structuredClone()` for deep cloning plain data objects.

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `model()` for two-way bound properties with `[(prop)]` syntax instead of pairing `input()` with `output()`
- Use `computed()` for derived state
- Use `linkedSignal()` for state derived from multiple reactive sources that must stay synchronized
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- Do NOT import `CommonModule`, import only the directives and pipes the template uses, such as `AsyncPipe` or `DatePipe`
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection

## Project-Specific Architecture (`design.md` & `plan.md`)

- **Monorepo Modular-Monolith Layout**: The repository contains two primary top-level folders at `$root`:
  - `$root/web/`: Angular 22+ frontend application, Storybook, `@ui` component library, and `web/Dockerfile`.
  - `$root/api/`: .NET 10 Modular-Monolith Minimal API, EF Core 10 + PostgreSQL, OpenAPI 3.1 contract (`api/openapi/v1.json`), and `api/Dockerfile`.
- **Docker & Native Dual-Mode Execution**: Both `web/` and `api/` are Docker-enabled via multi-stage `Dockerfile`s (`dev` and `prod` targets) and `$root/compose.yaml` + `$root/Makefile`:
  - Symmetrical native vs Docker targets: `make web` | `make docker-web`, `make api` | `make docker-api`, `make db` | `make docker-db`, `make dev` | `make docker-up`.
  - Clean teardown targets: `make docker-db-nuke` (resets only the PostgreSQL container and data volume) and `make docker-nuke` (removes all containers, volumes, networks, and local images).
  - OpenAPI codegen target: `make openapi-regen` (builds `api/openapi/v1.json` and regenerates the Angular TypeScript client in `web/`).
- **Single Global Stylesheet**: All frontend styling resides in `web/src/styles/styles.scss`. Components must NOT define `styleUrl`, `styleUrls`, or inline `styles: [...]` metadata.
- **Shared UI Library (`@ui`)**: Feature and page components (`web/src/app/features/**`) must NEVER import `@angular/material/*` directly. All Material Design 3 primitives must be encapsulated inside `web/src/app/shared/ui/` and imported via `@ui`.
- **Light & Dark Theme Tokens**: Always use semantic CSS custom properties (`--color-primary`, `--color-surface`, `--color-background`, `--color-border`, `--color-text-main`, `--color-text-muted`) defined in `web/src/styles/styles.scss`.
