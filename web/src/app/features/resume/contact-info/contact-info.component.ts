import { Component, computed, signal, type Signal } from '@angular/core';
import { MesChipComponent } from '@ui';

/**
 * Contact or social profile link item displayed in {@link ContactInfoComponent}.
 */
export interface ContactSocialLink {
  /** Display text for the pill chip. */
  readonly name: string;
  /** Target URL (`tel:`, `mailto:`, or `https://`). */
  readonly url: string;
  /** Material Design Icon class name (e.g., `'mdi-github'`). */
  readonly icon: string;
}

/**
 * Renders contact and social profile pill links (`<app-contact-info>`) using `<mes-chip>`.
 */
@Component({
  selector: 'app-contact-info',
  imports: [MesChipComponent],
  styles: `
    .contact-links-wrap {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-2);
      width: 100%;
    }

    :host ::ng-deep .contact-pill {
      font-weight: 500;
      transition:
        transform var(--transition-fast),
        box-shadow var(--transition-fast);
      text-decoration: none !important;
    }

    :host ::ng-deep .contact-pill:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px -2px rgba(var(--theme-primary-rgb), 0.3);
    }
  `,
  template: `
    <div class="contact-links-wrap" data-testid="contact-info-links">
      @for (link of contactLinks(); track link.url) {
        <mes-chip
          [href]="link.url"
          target="_blank"
          [prependIcon]="link.icon"
          color="primary"
          variant="tonal"
          size="small"
          chipClass="contact-pill"
        >
          {{ link.name }}
        </mes-chip>
      }
    </div>
  `,
})
export class ContactInfoComponent {
  private readonly socialLinks = signal<readonly ContactSocialLink[]>([
    {
      name: '+1 (305) 773-8214',
      url: 'tel:+3057738214',
      icon: 'mdi-phone-outline',
    },
    {
      name: 'manny2206@gmail.com',
      url: 'mailto:manny2206@gmail.com',
      icon: 'mdi-email-outline',
    },
    {
      name: 'Github',
      url: 'https://github.com/ManuelSaleta',
      icon: 'mdi-github',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/manuelsaleta/',
      icon: 'mdi-linkedin',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@theseriousprofessional/videos',
      icon: 'mdi-youtube',
    },
  ]);

  /**
   * Non-empty contact & social links rendered as tonal chips.
   */
  public readonly contactLinks: Signal<readonly ContactSocialLink[]> = computed(() =>
    this.socialLinks().filter((link) => link.name.trim() !== ''),
  );
}
