import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app shell', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the ambient topographic background and navigation bar', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.ambient-background')).toBeTruthy();
    expect(compiled.querySelectorAll('.topo-svg path').length).toBe(6);
    expect(compiled.querySelector('[data-testid="app-navigation-toolbar"]')).toBeTruthy();
    expect(compiled.querySelector('.brand-name')?.textContent).toContain('Manuel Saleta');
  });
});
