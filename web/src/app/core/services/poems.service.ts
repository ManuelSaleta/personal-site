import { computed, resource, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { poemFactory } from '../mocks/poem-factory';
import type { Poem } from '../models/portfolio.model';

/**
 * Type guard verifying whether an unknown payload is a valid {@link Poem} object.
 *
 * @param candidate - Unknown value to inspect.
 * @returns `true` if `candidate` conforms to the {@link Poem} contract.
 */
function isPoem(candidate: unknown): candidate is Poem {
  if (typeof candidate !== 'object' || candidate === null) {
    return false;
  }
  const record = candidate as Record<string, unknown>;
  return (
    typeof record['number'] === 'number' &&
    typeof record['title'] === 'string' &&
    typeof record['body'] === 'string'
  );
}

/**
 * Singleton Signal service managing asynchronous loading of "Slice of Life" poems.
 *
 * @remarks
 * Uses Angular's Signal-based `resource()` API to query `${environment.apiBaseUrl}/poems`
 * in production and gracefully falls back to {@link poemFactory} (`20` poems) in local development
 * or when the backend API is unreachable during standalone frontend development.
 */
@Service()
export class PoemsService {
  /**
   * Reactive `resource()` reference managing the poem list lifecycle (`value`, `isLoading`, `error`).
   */
  public readonly poemsResource = resource<readonly Poem[], void>({
    loader: async ({ abortSignal }): Promise<readonly Poem[]> => {
      if (!environment.production) {
        return poemFactory(20);
      }

      try {
        const response = await fetch(`${environment.apiBaseUrl}/poems`, {
          signal: abortSignal,
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) {
          return poemFactory(20);
        }
        const payload: unknown = await response.json();
        if (Array.isArray(payload) && payload.every(isPoem)) {
          return payload;
        }
        return poemFactory(20);
      } catch {
        return poemFactory(20);
      }
    },
  });

  /**
   * Read-only computed signal returning the loaded poems array (or an empty array while pending).
   */
  public readonly poems = computed<readonly Poem[]>(() => this.poemsResource.value() ?? []);

  /**
   * Read-only computed signal indicating whether the poems resource is currently loading.
   */
  public readonly isLoading = computed<boolean>(() => this.poemsResource.isLoading());
}
