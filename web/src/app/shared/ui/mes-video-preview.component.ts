import {
  Component,
  type ElementRef,
  input,
  signal,
  viewChild,
  type InputSignal,
  type InputSignalWithTransform,
  type WritableSignal,
} from '@angular/core';
import { trimmed, type MesSharedComponent } from './contracts/shared_component';

/**
 * Generic video thumbnail trigger button that opens a floating video preview popover (`<mes-video-preview>`).
 *
 * @remarks
 * Implements {@link MesSharedComponent} and uses `host` document click and `Escape` key
 * listeners to close the floating modal when the user interacts outside the wrapper or presses `Escape`.
 */
@Component({
  selector: 'mes-video-preview',
  host: {
    class: 'video-preview-wrapper',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'closeVideo()',
  },
  template: `
    @if (!hidden()) {
      <div
        #containerRef
        [attr.id]="id() || null"
        [attr.data-testid]="testdataId() || null"
        [style]="styleOverride() || null"
      >
        <button
          type="button"
          class="video-trigger-btn"
          [disabled]="disabled()"
          [attr.aria-label]="label() || 'Watch video preview'"
          [attr.aria-expanded]="isExpanded()"
          (click)="toggleVideo($event)"
        >
          @if (thumbnailUrl()) {
            <div
              class="video-thumbnail-bg"
              [style.background-image]="'url(' + thumbnailUrl() + ')'"
              aria-hidden="true"
            ></div>
          }

          <div class="video-trigger-content">
            <span class="play-icon-badge" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="play-svg-icon"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span class="video-trigger-label">{{ label() }}</span>
          </div>
        </button>

        @if (isExpanded()) {
          <div
            class="video-popup-modal"
            role="dialog"
            [attr.aria-label]="label() || 'Video preview'"
          >
            <ng-content />
          </div>
        }
      </div>
    }
  `,
  styles: `
    :host {
      position: relative;
      display: inline-block;
      width: 100%;
      max-width: 180px;
    }

    .video-trigger-btn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      cursor: pointer;
      overflow: hidden;
      border-radius: var(--radius-xl);
      border: 1px solid var(--color-border);
      background-color: var(--color-surface);
      padding: var(--space-2) var(--space-3);
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--color-text-main);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition:
        transform var(--transition-fast),
        background-color var(--transition-fast),
        border-color var(--transition-fast),
        box-shadow var(--transition-fast);
    }

    .video-trigger-btn:hover {
      transform: translateY(-2px);
      border-color: rgba(var(--theme-primary-rgb), 0.4);
      box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.16);
    }

    .video-trigger-btn:hover .video-thumbnail-bg {
      opacity: 0.35;
    }

    .video-trigger-btn:hover .play-icon-badge {
      transform: scale(1.1);
    }

    .video-trigger-btn:active {
      transform: translateY(0);
    }

    .video-thumbnail-bg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      opacity: 0.2;
      transition: opacity var(--transition-normal);
    }

    .video-trigger-content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: var(--space-2);
      min-width: 0;
    }

    .play-icon-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      border-radius: var(--radius-pill);
      background-color: #e50914;
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(229, 9, 20, 0.4);
      transition: transform var(--transition-fast);
    }

    .play-svg-icon {
      width: 14px;
      height: 14px;
      margin-left: 1.5px;
    }

    .video-trigger-label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: 0.02em;
    }

    .video-popup-modal {
      position: absolute;
      bottom: calc(100% + var(--space-3));
      left: 50%;
      transform: translateX(-50%);
      z-index: 50;
      width: 360px;
      max-width: 90vw;
      overflow: hidden;
      border-radius: var(--radius-2xl);
      background-color: #000000;
      box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.12);
      animation: video-modal-in var(--transition-normal);
    }

    @keyframes video-modal-in {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(8px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scale(1);
      }
    }
  `,
})
export class MesVideoPreviewComponent implements MesSharedComponent {
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
   * Whether the video preview trigger is disabled (`false` by default).
   */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Whether the video preview component is hidden from view (`false` by default).
   */
  public readonly hidden: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional custom inline style override (`''` by default).
   */
  public readonly styleOverride: InputSignal<string> = input<string>('');

  /**
   * Visible trigger button label text (e.g., `'Watch Quick Intro'`).
   */
  public readonly label: InputSignal<string> = input<string>('');

  /**
   * Optional background thumbnail image URL rendered inside the trigger button.
   */
  public readonly thumbnailUrl: InputSignal<string> = input<string>('');

  /**
   * Reactive signal tracking whether the floating video popup modal is expanded.
   */
  public readonly isExpanded: WritableSignal<boolean> = signal<boolean>(false);

  private readonly containerRef = viewChild<ElementRef<HTMLElement>>('containerRef');

  /**
   * Toggles the floating video modal open or closed.
   *
   * @param event - Trigger click event.
   */
  public toggleVideo(event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }
    event.stopPropagation();
    this.isExpanded.update((open: boolean): boolean => !open);
  }

  /**
   * Closes the floating video modal.
   */
  public closeVideo(): void {
    if (this.isExpanded()) {
      this.isExpanded.set(false);
    }
  }

  /**
   * Collapses the floating modal when a click occurs outside the component container.
   *
   * @param event - Document-level mouse click event.
   */
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.isExpanded()) {
      return;
    }
    const hostEl = this.containerRef()?.nativeElement;
    const targetNode = event.target instanceof Node ? event.target : null;
    if (hostEl && targetNode && !hostEl.contains(targetNode)) {
      this.closeVideo();
    }
  }
}
