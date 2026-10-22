import { Component } from '@angular/core';
import { MesIconComponent } from '@ui';
import { ResumeAboutComponent } from '../resume/resume-about/resume-about.component';
import { ResumeBaseComponent } from '../resume/resume-base/resume-base.component';
import { SkillsListComponent } from '../resume/skills-list/skills-list.component';

/**
 * Primary landing page (`HomePageComponent`, route `'/'`) combining the hero profile card,
 * professional experience timeline/grid, and technical skills catalog.
 */
@Component({
  selector: 'app-home-page',
  imports: [MesIconComponent, ResumeAboutComponent, ResumeBaseComponent, SkillsListComponent],
  styles: `
    .site-container {
      width: 90%;
      max-width: 90%;
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      padding: var(--space-6) var(--space-4);
      margin: 0 auto;
    }

    .site-section {
      margin-top: var(--space-8);
    }

    .heading-icon {
      margin-right: var(--space-1);
    }
  `,
  template: `
    <div class="site-container" data-testid="home-page-container">
      <app-resume-about />

      <section class="site-section" aria-labelledby="experience-section-heading">
        <h2 id="experience-section-heading" class="section-heading">
          <mes-icon icon="mdi-briefcase-outline" [size]="22" class="heading-icon" />
          <span>Professional Experience</span>
        </h2>
        <app-resume-base />
      </section>

      <section class="site-section" aria-labelledby="skills-section-heading">
        <h2 id="skills-section-heading" class="section-heading">
          <mes-icon icon="mdi-xml" [size]="22" class="heading-icon" />
          <span>Relevant Skills</span>
        </h2>
        <app-skills-list />
      </section>
    </div>
  `,
})
export class HomePageComponent {}
