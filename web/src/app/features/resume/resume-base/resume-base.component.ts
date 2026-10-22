import {
  Component,
  DestroyRef,
  effect,
  type ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  MesButtonComponent,
  MesButtonToggleComponent,
  type MesButtonToggleOption,
  MesDividerComponent,
  MesIconComponent,
  MesIframeComponent,
  MesTimelineComponent,
  MesTimelineItemComponent,
  MesVideoPreviewComponent,
} from '@ui';
import { ResumeService } from '../../../core/services/resume.service';
import { ResumeSectionComponent } from '../resume-section/resume-section.component';

/**
 * Supported layout modes for {@link ResumeBaseComponent}.
 */
export type ResumeViewMode = 'timeline' | 'cards';

/**
 * Career experience container (`<app-resume-base>`) supporting both a horizontal scrollable
 * timeline (`<mes-timeline>`) with edge-glow boundary physics and a 2-column responsive cards grid.
 */
@Component({
  selector: 'app-resume-base',
  imports: [
    MesButtonToggleComponent,
    MesIconComponent,
    MesTimelineComponent,
    MesTimelineItemComponent,
    MesDividerComponent,
    MesVideoPreviewComponent,
    MesIframeComponent,
    MesButtonComponent,
    ResumeSectionComponent,
  ],
  host: {
    '(window:resize)': 'handleResize()',
  },
  styles: `
    .resume-container {
      width: 100%;
    }

    .view-toggle-row {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: var(--space-6);
    }

    .timeline-hint {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-size: 0.8rem;
      color: var(--color-text-muted);
      margin-bottom: var(--space-3);
    }

    .horizontal-timeline-wrapper {
      width: 100%;
    }

    .timeline-scroll-container {
      position: relative;
      width: 100%;
    }

    .edge-glow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      height: 260px;
      max-height: 55%;
      width: 36px;
      pointer-events: none;
      z-index: 10;
      opacity: 0;
      transition:
        opacity var(--transition-normal),
        transform var(--transition-normal);
    }

    .edge-glow-left {
      left: 0;
      border-radius: 0 var(--radius-pill) var(--radius-pill) 0;
      background: radial-gradient(
        ellipse at 0% 50%,
        rgba(var(--theme-primary-rgb), 0.55) 0%,
        rgba(var(--theme-primary-rgb), 0.2) 50%,
        transparent 85%
      );
      box-shadow: inset 10px 0 16px -4px rgba(var(--theme-primary-rgb), 0.6);
    }

    .edge-glow-right {
      right: 0;
      border-radius: var(--radius-pill) 0 0 var(--radius-pill);
      background: radial-gradient(
        ellipse at 100% 50%,
        rgba(var(--theme-primary-rgb), 0.55) 0%,
        rgba(var(--theme-primary-rgb), 0.2) 50%,
        transparent 85%
      );
      box-shadow: inset -10px 0 16px -4px rgba(var(--theme-primary-rgb), 0.6);
    }

    .edge-glow::before {
      content: '';
      position: absolute;
      top: 15%;
      bottom: 15%;
      width: 3px;
      border-radius: var(--radius-pill);
      background: var(--color-primary);
      opacity: 0.85;
      filter: blur(1px);
      box-shadow: 0 0 10px 2px rgba(var(--theme-primary-rgb), 0.85);
    }

    .edge-glow-left::before {
      left: 2px;
    }

    .edge-glow-right::before {
      right: 2px;
    }

    .edge-glow.is-active {
      opacity: 0.9;
    }

    .edge-glow.is-hit {
      opacity: 1;
      animation: edge-glow-pulse 0.65s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes edge-glow-pulse {
      0% {
        opacity: 0.3;
        transform: translateY(-50%) scaleX(0.7);
      }
      45% {
        opacity: 1;
        transform: translateY(-50%) scaleX(1.3);
      }
      100% {
        opacity: 0.9;
        transform: translateY(-50%) scaleX(1);
      }
    }

    .horizontal-scroll-area {
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      padding: var(--space-4) var(--space-2);
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
      scrollbar-color: rgba(var(--theme-primary-rgb), 0.4) transparent;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-5);

      @media (min-width: 960px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .bottom-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
      padding: var(--space-2) 0;
    }

    @media print {
      .horizontal-scroll-area {
        overflow: visible !important;
      }

      .edge-glow {
        display: none !important;
      }
    }
  `,
  template: `
    <div class="resume-container" data-testid="resume-base-container">
      <div class="view-toggle-row no-print">
        <mes-button-toggle
          [(value)]="viewMode"
          [options]="viewOptions"
          ariaLabel="Experience layout mode"
          testdataId="resume-view-toggle"
        />
      </div>

      @if (viewMode() === 'timeline') {
        <div class="horizontal-timeline-wrapper" data-testid="resume-timeline-view">
          <div class="timeline-hint no-print">
            <mes-icon icon="mdi-gesture-swipe-horizontal" [size]="18" color="primary" />
            <span>
              Scroll horizontally to explore career journey (Most Recent on left ➔ Previous roles)
            </span>
          </div>

          <div class="timeline-scroll-container">
            <div
              class="edge-glow edge-glow-left"
              [class.is-active]="isAtLeft()"
              [class.is-hit]="hitLeft()"
              aria-hidden="true"
            ></div>
            <div
              class="edge-glow edge-glow-right"
              [class.is-active]="isAtRight()"
              [class.is-hit]="hitRight()"
              aria-hidden="true"
            ></div>

            <div
              #scrollAreaRef
              class="horizontal-scroll-area"
              data-testid="timeline-scroll-area"
              (scroll)="handleScroll()"
              (wheel)="handleWheel($event)"
            >
              <mes-timeline ariaLabel="Career journey timeline" testdataId="career-timeline">
                @for (section of resumeService.experience(); track section.id) {
                  <mes-timeline-item
                    [period]="parsePeriod(section.sub_heading)"
                    dotIcon="mdi-briefcase-outline"
                  >
                    <app-resume-section
                      [heading]="section.heading"
                      [subHeading]="section.sub_heading"
                      [contributions]="section.contributions"
                    />
                  </mes-timeline-item>
                }
              </mes-timeline>
            </div>
          </div>
        </div>
      } @else {
        <div class="cards-grid" data-testid="resume-cards-grid">
          @for (section of resumeService.experience(); track section.id) {
            <app-resume-section
              [heading]="section.heading"
              [subHeading]="section.sub_heading"
              [contributions]="section.contributions"
            />
          }
        </div>
      }

      <mes-divider dividerClass="bottom-divider" />
      <div class="bottom-bar">
        <mes-video-preview
          label="Watch Quick Intro"
          thumbnailUrl="https://img.youtube.com/vi/dj-GyXD9ZSc/maxresdefault.jpg"
          testdataId="resume-intro-video-preview"
        >
          <mes-iframe videoId="dj-GyXD9ZSc" title="Manuel Saleta Quick Intro" />
        </mes-video-preview>

        <mes-button
          [href]="resumeService.resumePdfUrl()"
          download="Manuel_Saleta_Resume.pdf"
          target="_blank"
          variant="tonal"
          color="primary"
          prependIcon="mdi-download"
          testdataId="resume-bottom-download-btn"
        >
          Download Resume PDF
        </mes-button>
      </div>
    </div>
  `,
})
export class ResumeBaseComponent {
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Injected singleton {@link ResumeService} providing career experience data.
   */
  public readonly resumeService = inject(ResumeService);

  /**
   * Active experience layout mode (`'timeline'` or `'cards'`).
   */
  public readonly viewMode = signal<ResumeViewMode>('timeline');

  /**
   * Segmented button toggle options for switching between timeline and card views.
   */
  public readonly viewOptions: readonly MesButtonToggleOption<ResumeViewMode>[] = [
    { value: 'timeline', label: 'Timeline View', icon: 'mdi-timeline-outline' },
    { value: 'cards', label: 'Cards Grid', icon: 'mdi-view-grid-outline' },
  ] as const;

  /**
   * Whether the horizontal timeline scroll container is currently at its left boundary.
   */
  public readonly isAtLeft = signal<boolean>(false);

  /**
   * Whether the horizontal timeline scroll container is currently at its right boundary.
   */
  public readonly isAtRight = signal<boolean>(false);

  /**
   * Transient pulse signal triggered when the user hits the left scroll boundary.
   */
  public readonly hitLeft = signal<boolean>(false);

  /**
   * Transient pulse signal triggered when the user hits the right scroll boundary.
   */
  public readonly hitRight = signal<boolean>(false);

  private readonly scrollAreaRef = viewChild<ElementRef<HTMLElement>>('scrollAreaRef');
  private userHasScrolled = false;
  private prevScrollLeft = 0;
  private leftHitTimer: ReturnType<typeof setTimeout> | null = null;
  private rightHitTimer: ReturnType<typeof setTimeout> | null = null;

  public constructor() {
    effect(() => {
      if (this.viewMode() === 'timeline') {
        this.userHasScrolled = false;
        this.isAtLeft.set(false);
        this.isAtRight.set(false);
      }
    });

    this.destroyRef.onDestroy(() => {
      if (this.leftHitTimer !== null) {
        clearTimeout(this.leftHitTimer);
      }
      if (this.rightHitTimer !== null) {
        clearTimeout(this.rightHitTimer);
      }
    });
  }

  /**
   * Extracts the date period segment from a `'COMPANY | PERIOD'` subtitle string.
   *
   * @param subHeading - Raw `sub_heading` string from `resume.json`.
   * @returns Trimmed date period or empty string if absent.
   */
  public parsePeriod(subHeading: string): string {
    const parts = subHeading.split('|').map((segment) => segment.trim());
    return parts[1] ?? '';
  }

  /**
   * Triggers a 650ms boundary pulse animation on the left or right edge-glow indicator.
   *
   * @param direction - Boundary edge (`'left'` or `'right'`).
   */
  public triggerHit(direction: 'left' | 'right'): void {
    if (direction === 'left') {
      this.hitLeft.set(true);
      if (this.leftHitTimer !== null) {
        clearTimeout(this.leftHitTimer);
      }
      this.leftHitTimer = setTimeout(() => {
        this.hitLeft.set(false);
      }, 650);
    } else {
      this.hitRight.set(true);
      if (this.rightHitTimer !== null) {
        clearTimeout(this.rightHitTimer);
      }
      this.rightHitTimer = setTimeout(() => {
        this.hitRight.set(false);
      }, 650);
    }
  }

  /**
   * Evaluates the horizontal scroll bounds of the timeline track and updates edge-glow signals.
   */
  public checkScrollBounds(): void {
    const el = this.scrollAreaRef()?.nativeElement;
    if (!el) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);
    const threshold = 16;

    const atLeft = scrollLeft <= threshold;
    const atRight = scrollLeft >= maxScroll - threshold;

    if (this.userHasScrolled) {
      if (atLeft && !this.isAtLeft() && scrollLeft <= this.prevScrollLeft) {
        this.triggerHit('left');
      }
      if (atRight && !this.isAtRight() && scrollLeft >= this.prevScrollLeft) {
        this.triggerHit('right');
      }
    }

    this.isAtLeft.set(atLeft && this.userHasScrolled);
    this.isAtRight.set(atRight && this.userHasScrolled);
    this.prevScrollLeft = scrollLeft;
  }

  /**
   * Handles scroll events on the horizontal timeline track.
   */
  public handleScroll(): void {
    this.userHasScrolled = true;
    this.checkScrollBounds();
  }

  /**
   * Detects horizontal wheel overscroll at the left or right timeline boundary to pulse edge glow.
   *
   * @param event - Native wheel event.
   */
  public handleWheel(event: WheelEvent): void {
    const el = this.scrollAreaRef()?.nativeElement;
    if (!el) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);

    if (scrollLeft <= 16 && (event.deltaX < -4 || (event.shiftKey && event.deltaY < -4))) {
      this.userHasScrolled = true;
      this.isAtLeft.set(true);
      this.triggerHit('left');
    } else if (
      scrollLeft >= maxScroll - 16 &&
      (event.deltaX > 4 || (event.shiftKey && event.deltaY > 4))
    ) {
      this.userHasScrolled = true;
      this.isAtRight.set(true);
      this.triggerHit('right');
    }
  }

  /**
   * Re-checks timeline scroll bounds when the browser viewport resizes.
   */
  public handleResize(): void {
    if (this.viewMode() === 'timeline') {
      this.checkScrollBounds();
    }
  }
}
