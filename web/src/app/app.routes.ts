import type { Routes } from '@angular/router';

/**
 * Root application routes configured with lazy-loaded feature page components.
 */
export const routes: Routes = [
  {
    path: '',
    title: 'Manuel Saleta | Staff & Lead Software Engineer',
    loadComponent: () =>
      import('./features/home/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'PoemsPage',
    title: 'Slice of Life Poems | Manuel Saleta',
    loadComponent: () =>
      import('./features/poems/poems-page.component').then((m) => m.PoemsPageComponent),
  },
  {
    path: 'BooksPage',
    title: 'Bookshelf | Manuel Saleta',
    loadComponent: () =>
      import('./features/books/books-page.component').then((m) => m.BooksPageComponent),
  },
  {
    path: 'AboutMe',
    title: 'About | Manuel Saleta',
    loadComponent: () =>
      import('./features/about/about-me-page.component').then((m) => m.AboutMePageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
