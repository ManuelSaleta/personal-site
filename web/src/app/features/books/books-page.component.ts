import { Component, signal } from '@angular/core';
import { MesCardComponent, MesChipComponent, MesHeadingComponent } from '@ui';

/**
 * Represents a recommended technical or literary book displayed on {@link BooksPageComponent}.
 */
export interface BookRecommendation {
  /** Book title. */
  readonly title: string;
  /** Book author(s). */
  readonly author: string;
  /** Subject category label. */
  readonly category: string;
  /** Concise takeaway or review note. */
  readonly summary: string;
}

/**
 * Books & reading shelf page (`BooksPageComponent`, route `'/BooksPage'`).
 */
@Component({
  selector: 'app-books-page',
  imports: [MesCardComponent, MesChipComponent, MesHeadingComponent],
  styles: `
    .books-page-container {
      width: 100%;
      max-width: 960px;
      margin: 0 auto;
      padding: var(--space-8) var(--space-4);
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
    }

    .books-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-5);

      @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    :host ::ng-deep .book-card {
      padding: var(--space-5);
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .book-header {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }

    .book-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin: 0;
    }

    .book-author {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-text-muted);
    }

    .book-summary {
      font-size: 0.925rem;
      line-height: 1.65;
      color: var(--color-text-main);
      margin: 0;
    }
  `,
  template: `
    <div class="books-page-container" data-testid="books-page-container">
      <mes-heading
        size="h1"
        text="Reading & Engineering Bookshelf"
        [underline]="true"
        testdataId="books-page-heading"
      />

      <div class="books-grid">
        @for (book of books(); track book.title) {
          <mes-card rounded="xl" cardClass="book-card" testdataId="book-card">
            <div class="book-header">
              <mes-chip size="x-small" color="primary" variant="tonal">
                {{ book.category }}
              </mes-chip>
              <h2 class="book-title">{{ book.title }}</h2>
              <span class="book-author">by {{ book.author }}</span>
            </div>
            <p class="book-summary">{{ book.summary }}</p>
          </mes-card>
        }
      </div>
    </div>
  `,
})
export class BooksPageComponent {
  /**
   * Read-only signal of curated software architecture and systems engineering books.
   */
  public readonly books = signal<readonly BookRecommendation[]>([
    {
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      category: 'Distributed Systems',
      summary:
        'Foundational blueprint for replication, partitioning, consensus, and transactional outbox reliability.',
    },
    {
      title: 'Domain-Driven Design: Tackling Complexity in the Heart of Software',
      author: 'Eric Evans',
      category: 'Software Architecture',
      summary:
        'Bounded contexts, ubiquitous language, and rich domain modeling for modular monoliths and microservices.',
    },
  ]).asReadonly();
}
