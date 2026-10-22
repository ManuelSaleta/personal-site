import type { InputSignal, InputSignalWithTransform, Signal, WritableSignal } from '@angular/core';

/**
 * Trims leading and trailing whitespace from string input bindings.
 *
 * @param value - Raw string value bound to an Angular signal input.
 * @returns Trimmed string, or `''` when `null` or `undefined`.
 */
export function trimmed(value: string | null | undefined): string {
  return (value ?? '').trim();
}

/**
 * Base contract that all shared UI (`@ui`) wrapper components implement.
 *
 * @remarks
 * Standardizes DOM identity (`id`), automated test selectors (`testdataId`),
 * interactive/visibility states (`disabled`, `hidden`), and custom CSS style
 * overrides (`styleOverride`) across all `mes-*` components.
 */
export interface MesSharedComponent {
  /**
   * Unique DOM element identifier bound to the rendered element, transformed via {@link trimmed}.
   */
  readonly id: InputSignalWithTransform<string, string | null | undefined>;

  /**
   * Automated testing selector attribute (`data-testid`) following Cypress / Vitest conventions,
   * transformed via {@link trimmed}.
   */
  readonly testdataId: InputSignalWithTransform<string, string | null | undefined>;

  /**
   * Whether the component is in a disabled, non-interactive state (`false` by default).
   */
  readonly disabled: InputSignal<boolean> | WritableSignal<boolean> | Signal<boolean>;

  /**
   * Whether the component is hidden from view (`false` by default).
   */
  readonly hidden: InputSignal<boolean> | WritableSignal<boolean> | Signal<boolean>;

  /**
   * Optional custom inline style override string (`''` by default).
   */
  readonly styleOverride: InputSignal<string> | WritableSignal<string> | Signal<string>;
}
