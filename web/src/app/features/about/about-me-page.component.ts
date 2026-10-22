import { Component } from '@angular/core';
import { MesHeadingComponent } from '@ui';
import { ResumeAboutComponent } from '../resume/resume-about/resume-about.component';

/**
 * Standalone About page (`AboutMePageComponent`, route `'/AboutMe'`).
 */
@Component({
  selector: 'app-about-me-page',
  imports: [MesHeadingComponent, ResumeAboutComponent],
  styles: `
    .about-page {
      padding: var(--space-8) var(--space-4);
      max-width: 960px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
    }
  `,
  template: `
    <div class="about-page" data-testid="about-me-page">
      <mes-heading size="h1" text="About" [underline]="true" />
      <app-resume-about />
    </div>
  `,
})
export class AboutMePageComponent {}
