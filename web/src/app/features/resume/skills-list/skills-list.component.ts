import { Component, inject } from '@angular/core';
import { MesCardComponent, MesChipComponent } from '@ui';
import { ResumeService } from '../../../core/services/resume.service';

/**
 * Renders the grid of brand-colored technical skill pill links (`<app-skills-list>`)
 * sourced from {@link ResumeService.skills}.
 */
@Component({
  selector: 'app-skills-list',
  imports: [MesCardComponent, MesChipComponent],
  styles: `
    :host ::ng-deep .skills-card {
      padding: var(--space-5);
      width: 100%;
    }

    .skills-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    :host ::ng-deep .skill-item {
      font-weight: 500;
      transition: transform var(--transition-fast);
    }

    :host ::ng-deep .skill-item:hover {
      transform: translateY(-2px);
    }
  `,
  template: `
    <mes-card rounded="2xl" cardClass="skills-card" testdataId="skills-list-card">
      <div class="skills-wrap">
        @for (skill of resumeService.skills(); track $index) {
          <mes-chip
            [text]="skill.name"
            [href]="skill.url"
            [color]="skill.color"
            [prependIcon]="'mdi-' + skill.icon"
            variant="elevated"
            size="small"
            chipClass="skill-item"
          >
            {{ skill.name }}
          </mes-chip>
        }
      </div>
    </mes-card>
  `,
})
export class SkillsListComponent {
  /**
   * Injected singleton {@link ResumeService} providing the technical skills catalog.
   */
  public readonly resumeService = inject(ResumeService);
}
