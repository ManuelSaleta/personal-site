import {
  Component,
  computed,
  input,
  type InputSignal,
  type InputSignalWithTransform,
  type Signal,
} from '@angular/core';
import { trimmed, type MesSharedComponent } from './contracts/shared_component';

/**
 * Semantic HTML heading levels supported by {@link MesHeadingComponent}.
 */
export type MesHeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Generic semantic section heading wrapper (`h1`–`h6`) (`<mes-heading>`).
 *
 * @remarks
 * Implements {@link MesSharedComponent}.
 */
@Component({
  selector: 'mes-heading',
  template: `
    @if (!hidden()) {
      @switch (size()) {
        @case ('h1') {
          <h1
            [attr.id]="id() || null"
            [attr.data-testid]="testdataId() || null"
            [attr.aria-disabled]="disabled() || null"
            [class]="headingClasses()"
            [style]="styleOverride() || null"
          >
            {{ text() }}
          </h1>
        }
        @case ('h2') {
          <h2
            [attr.id]="id() || null"
            [attr.data-testid]="testdataId() || null"
            [attr.aria-disabled]="disabled() || null"
            [class]="headingClasses()"
            [style]="styleOverride() || null"
          >
            {{ text() }}
          </h2>
        }
        @case ('h3') {
          <h3
            [attr.id]="id() || null"
            [attr.data-testid]="testdataId() || null"
            [attr.aria-disabled]="disabled() || null"
            [class]="headingClasses()"
            [style]="styleOverride() || null"
          >
            {{ text() }}
          </h3>
        }
        @case ('h4') {
          <h4
            [attr.id]="id() || null"
            [attr.data-testid]="testdataId() || null"
            [attr.aria-disabled]="disabled() || null"
            [class]="headingClasses()"
            [style]="styleOverride() || null"
          >
            {{ text() }}
          </h4>
        }
        @case ('h5') {
          <h5
            [attr.id]="id() || null"
            [attr.data-testid]="testdataId() || null"
            [attr.aria-disabled]="disabled() || null"
            [class]="headingClasses()"
            [style]="styleOverride() || null"
          >
            {{ text() }}
          </h5>
        }
        @case ('h6') {
          <h6
            [attr.id]="id() || null"
            [attr.data-testid]="testdataId() || null"
            [attr.aria-disabled]="disabled() || null"
            [class]="headingClasses()"
            [style]="styleOverride() || null"
          >
            {{ text() }}
          </h6>
        }
      }
    }
  `,
  styles: `
    .heading {
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--color-text-main);
      margin: 0 0 var(--space-6);
    }

    .heading--h1 {
      font-size: 2rem;
    }

    .heading--h2 {
      font-size: 1.75rem;
    }

    .heading--h3 {
      font-size: 1.5rem;
    }

    .heading--h4 {
      font-size: 1.25rem;
    }

    .heading--h5 {
      font-size: 1.1rem;
    }

    .heading--h6 {
      font-size: 1rem;
    }

    .heading--underline {
      text-decoration: underline;
      text-underline-offset: 6px;
      text-decoration-color: var(--color-primary);
    }
  `,
})
export class MesHeadingComponent implements MesSharedComponent {
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
   * Whether the heading is in a disabled state (`false` by default).
   */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Whether the heading is hidden from view (`false` by default).
   */
  public readonly hidden: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional custom inline style override (`''` by default).
   */
  public readonly styleOverride: InputSignal<string> = input<string>('');

  /**
   * Heading text content.
   */
  public readonly text: InputSignal<string> = input.required<string>();

  /**
   * Semantic heading tag level (`'h1'` through `'h6'`, defaulting to `'h1'`).
   */
  public readonly size: InputSignal<MesHeadingSize> = input<MesHeadingSize>('h1');

  /**
   * Whether to render a primary-colored underline decoration beneath the heading.
   */
  public readonly underline: InputSignal<boolean> = input<boolean>(false);

  /**
   * Computed CSS classes for the heading element.
   */
  protected readonly headingClasses: Signal<string> = computed((): string => {
    const classes = ['heading', `heading--${this.size()}`];
    if (this.underline()) {
      classes.push('heading--underline');
    }
    return classes.join(' ');
  });
}
