import {
  Component,
  computed,
  inject,
  input,
  type InputSignal,
  type InputSignalWithTransform,
  type Signal,
} from '@angular/core';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';
import { trimmed, type MesSharedComponent } from './contracts/shared_component';

/**
 * Generic responsive iframe / privacy-enhanced YouTube embed wrapper (`<mes-iframe>`).
 *
 * @remarks
 * Implements {@link MesSharedComponent}, extracts the 11-character YouTube video ID
 * from raw IDs, watch URLs, or `/shorts/` URLs, and sanitizes the `youtube-nocookie.com`
 * embed URL via Angular's {@link DomSanitizer}.
 */
@Component({
  selector: 'mes-iframe',
  template: `
    @if (!hidden()) {
      <div
        class="vertical-embed-container"
        [attr.id]="id() || null"
        [attr.data-testid]="testdataId() || null"
        [attr.aria-disabled]="disabled() || null"
        [style]="styleOverride() || null"
      >
        <div class="iframe-wrapper" [style.aspect-ratio]="aspectRatio()">
          <iframe
            [src]="embedUrl()"
            [title]="title()"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    }
  `,
  styles: `
    .vertical-embed-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }

    .iframe-wrapper {
      position: relative;
      width: 100%;
      border-radius: var(--radius-xl);
      overflow: hidden;
      background-color: #000000;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    }

    .iframe-wrapper iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  `,
})
export class MesIframeComponent implements MesSharedComponent {
  private readonly sanitizer = inject(DomSanitizer);

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
   * Whether the iframe container is in a disabled state (`false` by default).
   */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Whether the iframe container is hidden from view (`false` by default).
   */
  public readonly hidden: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional custom inline style override (`''` by default).
   */
  public readonly styleOverride: InputSignal<string> = input<string>('');

  /**
   * Raw 11-character YouTube video ID or full YouTube / YouTube Shorts URL.
   */
  public readonly videoId: InputSignal<string> = input.required<string>();

  /**
   * Accessible `title` attribute for the embedded `<iframe>`.
   */
  public readonly title: InputSignal<string> = input<string>('Embedded video player');

  /**
   * CSS `aspect-ratio` applied to the responsive iframe wrapper (`'9/16'` by default).
   */
  public readonly aspectRatio: InputSignal<string> = input<string>('9/16');

  /**
   * Extracted 11-character YouTube video identifier.
   */
  public readonly cleanVideoId: Signal<string> = computed((): string => {
    const idOrUrl = this.videoId().trim();
    const match = /(?:shorts\/|v=|\/embed\/|youtu\.be\/|\/v\/|^)([a-zA-Z0-9_-]{11})/.exec(idOrUrl);
    return match?.[1] ?? idOrUrl;
  });

  /**
   * Sanitized `youtube-nocookie.com` embed URL ready for `<iframe [src]>`.
   */
  protected readonly embedUrl: Signal<SafeResourceUrl> = computed((): SafeResourceUrl => {
    const rawUrl = `https://www.youtube-nocookie.com/embed/${this.cleanVideoId()}?rel=0&modestbranding=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  });
}
