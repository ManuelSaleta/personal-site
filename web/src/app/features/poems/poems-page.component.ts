import { Component, inject } from '@angular/core';
import { MesCardComponent, MesDividerComponent, MesSpinnerComponent } from '@ui';
import { PoemsService } from '../../core/services/poems.service';

/**
 * "Slice of Life" poems page (`PoemsPageComponent`, route `'/PoemsPage'`) displaying
 * loading state via `<mes-spinner>` and verse cards via `<mes-card>`.
 */
@Component({
  selector: 'app-poems-page',
  imports: [MesCardComponent, MesDividerComponent, MesSpinnerComponent],
  styles: `
    .poems-page-container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: var(--space-8) var(--space-4);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .poems-header {
      text-align: center;
      margin-bottom: var(--space-8);
    }

    .poems-title {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--color-text-main);
      margin: 0;
    }

    .poems-subtitle {
      font-size: 1rem;
      font-weight: 500;
      color: var(--color-primary);
      margin-top: var(--space-1);
      margin-bottom: 0;
    }

    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-8) 0;
      color: var(--color-text-muted);
    }

    .loading-text {
      font-size: 0.95rem;
      letter-spacing: 0.02em;
    }

    .poems-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
      width: 100%;
    }

    :host ::ng-deep .poem-card {
      width: 100%;
    }

    :host ::ng-deep .poem-card:hover {
      transform: translateY(-2px);
      border-color: rgba(var(--theme-primary-rgb), 0.4) !important;
      box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 0.12);
    }

    .poem-title {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      padding: var(--space-4) var(--space-5) var(--space-3);
      margin: 0;
    }

    .poem-number {
      color: var(--color-primary);
      font-size: 1rem;
      font-weight: 600;
      opacity: 0.85;
    }

    .poem-body {
      padding: var(--space-4) var(--space-5);
    }

    .poem-pre {
      font-family: inherit;
      white-space: pre-wrap;
      line-height: 1.75;
      font-size: 0.95rem;
      color: var(--color-text-main);
      margin: 0;
    }
  `,
  template: `
    <div class="poems-page-container" data-testid="poems-page-container">
      <header class="poems-header">
        <h1 class="poems-title">Slice of Life Poems</h1>
        <p class="poems-subtitle">Reflections, verses, and observations</p>
      </header>

      @if (poemsService.isLoading()) {
        <div class="loading-state" data-testid="poems-loading-state">
          <mes-spinner [size]="32" ariaLabel="Loading poems" />
          <span class="loading-text">Loading poems...</span>
        </div>
      } @else {
        <div class="poems-list" data-testid="poems-list">
          @for (poem of poemsService.poems(); track poem.number) {
            <mes-card rounded="xl" cardClass="poem-card" testdataId="poem-card">
              <h2 class="poem-title">
                <span class="poem-number">#{{ poem.number }}</span>
                <span>{{ poem.title }}</span>
              </h2>
              <mes-divider dividerClass="poem-divider" />
              <div class="poem-body">
                <pre class="poem-pre">{{ poem.body }}</pre>
              </div>
            </mes-card>
          }
        </div>
      }
    </div>
  `,
})
export class PoemsPageComponent {
  /**
   * Injected singleton {@link PoemsService} managing the poems resource lifecycle.
   */
  public readonly poemsService = inject(PoemsService);
}
