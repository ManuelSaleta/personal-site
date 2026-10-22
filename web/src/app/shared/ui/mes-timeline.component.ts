import { Component, input, type InputSignal, type InputSignalWithTransform } from '@angular/core';
import { trimmed, type MesSharedComponent } from './contracts/shared_component';
import { MesChipComponent } from './mes-chip.component';
import { MesIconComponent } from './mes-icon.component';

/**
 * Individual node item within a horizontal {@link MesTimelineComponent} (`<mes-timeline-item>`).
 *
 * @remarks
 * Implements {@link MesSharedComponent} and renders an optional opposite badge (`period`),
 * a horizontal track line with a centered primary icon dot (`dotIcon`), and the projected card body.
 */
@Component({
  selector: 'mes-timeline-item',
  imports: [MesChipComponent, MesIconComponent],
  host: {
    class: 'timeline-horizontal-item',
  },
  template: `
    @if (!hidden()) {
      <div
        class="timeline-item-inner"
        [attr.id]="id() || null"
        [attr.data-testid]="testdataId() || null"
        [attr.aria-disabled]="disabled() || null"
        [style]="styleOverride() || null"
      >
        <div class="timeline-opposite-pill">
          @if (period()) {
            <mes-chip
              size="small"
              color="primary"
              variant="tonal"
              prependIcon="mdi-calendar-range"
              chipClass="opposite-chip"
              [disabled]="disabled()"
            >
              {{ period() }}
            </mes-chip>
          }
        </div>

        <div class="timeline-node-track" aria-hidden="true">
          <div class="timeline-node-dot">
            <mes-icon [icon]="dotIcon()" [size]="14" color="white" />
          </div>
        </div>

        <div class="timeline-item-body">
          <ng-content />
        </div>
      </div>
    }
  `,
  styles: `
    .timeline-item-inner {
      display: contents;
    }

    .timeline-opposite-pill {
      width: 100%;
      max-width: 462px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--space-3);
    }

    .timeline-node-track {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      position: relative;
      margin-bottom: var(--space-3);
    }

    .timeline-node-track::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--color-border);
      z-index: 0;
    }

    .timeline-node-dot {
      position: relative;
      z-index: 1;
      width: 28px;
      height: 28px;
      border-radius: var(--radius-pill);
      background-color: var(--color-primary);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 0 4px var(--color-background);
    }

    .timeline-item-body {
      width: 740px;
      max-width: 740px;
      margin-inline: -39px;
    }

    @media (max-width: 600px) {
      .timeline-item-body {
        width: 340px;
        max-width: 340px;
        margin-inline: -25px;
      }

      .timeline-opposite-pill {
        max-width: 290px;
      }
    }
  `,
})
export class MesTimelineItemComponent implements MesSharedComponent {
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
   * Whether the timeline item is in a disabled state (`false` by default).
   */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Whether the timeline item is hidden from view (`false` by default).
   */
  public readonly hidden: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional custom inline style override (`''` by default).
   */
  public readonly styleOverride: InputSignal<string> = input<string>('');

  /**
   * Optional date/period string displayed in the opposite badge above the timeline node.
   */
  public readonly period: InputSignal<string> = input<string>('');

  /**
   * Material Design Icon displayed inside the circular timeline node dot.
   */
  public readonly dotIcon: InputSignal<string> = input<string>('mdi-briefcase-outline');
}

/**
 * Generic Material Design 3 horizontal timeline container (`<mes-timeline>`).
 *
 * @remarks
 * Implements {@link MesSharedComponent} and projects `<mes-timeline-item>` children
 * along a horizontal CSS Grid track.
 */
@Component({
  selector: 'mes-timeline',
  template: `
    @if (!hidden()) {
      <div
        class="career-timeline-horizontal"
        role="list"
        [attr.id]="id() || null"
        [attr.data-testid]="testdataId() || null"
        [attr.aria-disabled]="disabled() || null"
        [attr.aria-label]="ariaLabel()"
        [style]="styleOverride() || null"
      >
        <ng-content />
      </div>
    }
  `,
  styles: `
    .career-timeline-horizontal {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 462px;
      width: max-content;
      min-width: 100%;
      padding: var(--space-4) 60px var(--space-6);
      position: relative;
    }

    @media (max-width: 600px) {
      .career-timeline-horizontal {
        grid-auto-columns: 290px;
        padding: var(--space-2) 24px var(--space-4);
      }
    }
  `,
})
export class MesTimelineComponent implements MesSharedComponent {
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
   * Whether the timeline is in a disabled state (`false` by default).
   */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Whether the timeline is hidden from view (`false` by default).
   */
  public readonly hidden: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional custom inline style override (`''` by default).
   */
  public readonly styleOverride: InputSignal<string> = input<string>('');

  /**
   * Accessible label describing the timeline track.
   */
  public readonly ariaLabel: InputSignal<string> = input<string>('Timeline');
}
