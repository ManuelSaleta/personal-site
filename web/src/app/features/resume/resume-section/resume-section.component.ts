import { Component, computed, input, type InputSignal, type Signal } from '@angular/core';
import {
  MesAvatarComponent,
  MesCardComponent,
  MesChipComponent,
  MesDividerComponent,
  MesIconComponent,
} from '@ui';

/**
 * Parsed organization and date period extracted from an experience `sub_heading` string.
 */
export interface ParsedExperienceMeta {
  /** Organization or role focus segment before `'|'`. */
  readonly company: string;
  /** Optional date period or secondary segment after `'|'`. */
  readonly period: string;
}

const TECH_KEYWORDS: readonly string[] = [
  '.NET 10',
  '.NET Core',
  'C#',
  'ASP.NET',
  'Kubernetes',
  'Docker',
  'Terraform',
  'AWS',
  'Azure',
  'Angular',
  'Vue.js',
  'TypeScript',
  'Dapper',
  'RabbitMQ',
  'Auth0',
  'Tailscale',
  'Cloudflare',
  'Python',
  'Ruby',
] as const;

/**
 * Renders an individual career experience card (`<app-resume-section>`) with role heading,
 * company subtitle, period badge, accomplishment bullets, and auto-detected key stack chips.
 */
@Component({
  selector: 'app-resume-section',
  imports: [
    MesCardComponent,
    MesAvatarComponent,
    MesIconComponent,
    MesChipComponent,
    MesDividerComponent,
  ],
  styles: `
    :host ::ng-deep .experience-card {
      width: 100%;
      padding: var(--space-5);
    }

    :host ::ng-deep .experience-card:hover {
      transform: translateY(-2px);
      border-color: rgba(var(--theme-primary-rgb), 0.4) !important;
      box-shadow: 0 10px 28px -6px rgba(0, 0, 0, 0.1);
    }

    .header-item {
      display: flex;
      align-items: flex-start;
      gap: var(--space-3);
      padding-bottom: var(--space-3);
    }

    .header-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-2);
      width: 100%;
    }

    .role-group {
      display: flex;
      flex-direction: column;
    }

    .role-title {
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      margin: 0;
      line-height: 1.35;
      color: var(--color-text-main);
    }

    .card-content {
      padding-top: var(--space-3);
    }

    .tech-stack-group {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-2);
      margin-top: var(--space-4);
      padding-top: var(--space-2);
      border-top: 1px dashed var(--color-border);
    }

    .tech-stack-label {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text-muted);
    }

    .tech-chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1);
    }

    @media print {
      :host ::ng-deep .experience-card {
        break-inside: avoid;
        border: 1px solid #d1d5db !important;
        box-shadow: none !important;
      }
    }
  `,
  template: `
    <mes-card rounded="xl" cardClass="experience-card" testdataId="resume-section-card">
      <div class="header-item">
        <mes-avatar [size]="42" avatarClass="role-avatar">
          <mes-icon icon="mdi-briefcase-outline" [size]="22" />
        </mes-avatar>

        <div class="header-container">
          <div class="role-group">
            <h3 class="role-title">{{ heading() }}</h3>
            <div class="entity-subtitle">{{ parsedMeta().company }}</div>
          </div>

          @if (parsedMeta().period) {
            <mes-chip
              size="small"
              color="primary"
              variant="tonal"
              prependIcon="mdi-calendar-range"
              chipClass="period-badge"
            >
              {{ parsedMeta().period }}
            </mes-chip>
          }
        </div>
      </div>

      <mes-divider dividerClass="divider-subtle" />

      <div class="card-content">
        <ul class="resume-bullet-list">
          @for (item of contributions(); track item) {
            <li>{{ item }}</li>
          }
        </ul>

        @if (displayedTechs().length > 0) {
          <div class="tech-stack-group">
            <span class="tech-stack-label">Key Stack:</span>
            <div class="tech-chips">
              @for (tech of displayedTechs(); track tech) {
                <mes-chip size="x-small" variant="tonal" color="secondary" chipClass="tech-chip">
                  {{ tech }}
                </mes-chip>
              }
            </div>
          </div>
        }
      </div>
    </mes-card>
  `,
})
export class ResumeSectionComponent {
  /**
   * Primary role or section title (e.g., `'STAFF SOFTWARE ENGINEER'`).
   */
  public readonly heading: InputSignal<string> = input.required<string>();

  /**
   * Company name and period string separated by `'|'` (e.g., `'SEABOARD MARINE | 08/2026 - PRESENT'`).
   */
  public readonly subHeading: InputSignal<string> = input.required<string>();

  /**
   * Ordered list of accomplishment bullet points.
   */
  public readonly contributions: InputSignal<readonly string[]> =
    input.required<readonly string[]>();

  /**
   * Optional explicit technology tags; when empty, tags are inferred from {@link contributions}.
   */
  public readonly technologies: InputSignal<readonly string[]> = input<readonly string[]>([]);

  /**
   * Computed company name and period split from {@link subHeading}.
   */
  public readonly parsedMeta: Signal<ParsedExperienceMeta> = computed((): ParsedExperienceMeta => {
    const parts = this.subHeading()
      .split('|')
      .map((segment) => segment.trim());
    return {
      company: parts[0] ?? '',
      period: parts[1] ?? '',
    };
  });

  /**
   * Computed list of technology tags either passed explicitly or detected within {@link contributions}.
   */
  public readonly displayedTechs: Signal<readonly string[]> = computed((): readonly string[] => {
    const explicit = this.technologies();
    if (explicit.length > 0) {
      return explicit;
    }
    const allText = this.contributions().join(' ').toLowerCase();
    return TECH_KEYWORDS.filter((keyword) => allText.includes(keyword.toLowerCase()));
  });
}
