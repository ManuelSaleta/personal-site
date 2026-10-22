import { TestBed } from '@angular/core/testing';
import {
  MesCardComponent,
  MesChipComponent,
  MesHeadingComponent,
  MesIframeComponent,
  trimmed,
} from './index';

describe('Shared UI Library (@ui — mes-* generic components implementing MesSharedComponent)', () => {
  it('trimmed() should strip leading and trailing whitespace and handle null/undefined', () => {
    expect(trimmed('  hero-card  ')).toBe('hero-card');
    expect(trimmed(null)).toBe('');
    expect(trimmed(undefined)).toBe('');
  });

  it('MesCardComponent should bind trimmed id, testdataId, disabled, styleOverride, and respect @if (!hidden())', async () => {
    await TestBed.configureTestingModule({
      imports: [MesCardComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(MesCardComponent);
    fixture.componentRef.setInput('id', '  card-1  ');
    fixture.componentRef.setInput('testdataId', '  test-card  ');
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('styleOverride', 'opacity: 0.75;');
    fixture.componentRef.setInput('rounded', '2xl');
    await fixture.whenStable();

    const hostEl = fixture.nativeElement as HTMLElement;
    const cardEl = hostEl.querySelector('mat-card');
    expect(cardEl?.getAttribute('id')).toBe('card-1');
    expect(cardEl?.getAttribute('data-testid')).toBe('test-card');
    expect(cardEl?.getAttribute('aria-disabled')).toBe('true');
    expect(cardEl?.classList.contains('mes-card--rounded-2xl')).toBe(true);

    fixture.componentRef.setInput('hidden', true);
    await fixture.whenStable();
    expect(hostEl.querySelector('mat-card')).toBeNull();
  });

  it('MesIframeComponent should extract 11-char YouTube ID from shorts, watch, and raw strings', async () => {
    await TestBed.configureTestingModule({
      imports: [MesIframeComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(MesIframeComponent);
    fixture.componentRef.setInput('videoId', 'https://www.youtube.com/shorts/dj-GyXD9ZSc');
    await fixture.whenStable();

    expect(fixture.componentInstance.cleanVideoId()).toBe('dj-GyXD9ZSc');
  });

  it('MesHeadingComponent should render the requested heading level, underline class, and hide when hidden is true', async () => {
    await TestBed.configureTestingModule({
      imports: [MesHeadingComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(MesHeadingComponent);
    fixture.componentRef.setInput('text', 'Professional Experience');
    fixture.componentRef.setInput('size', 'h2');
    fixture.componentRef.setInput('underline', true);
    await fixture.whenStable();

    const hostEl = fixture.nativeElement as HTMLElement;
    const h2 = hostEl.querySelector('h2');
    expect(h2?.textContent?.trim()).toBe('Professional Experience');
    expect(h2?.classList.contains('heading--underline')).toBe(true);

    fixture.componentRef.setInput('hidden', true);
    await fixture.whenStable();
    expect(hostEl.querySelector('h2')).toBeNull();
  });

  it('MesChipComponent should render brand hex color and normalized mdi icon', async () => {
    await TestBed.configureTestingModule({
      imports: [MesChipComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(MesChipComponent);
    fixture.componentRef.setInput('text', '.NET 10');
    fixture.componentRef.setInput('color', '#512BD4');
    fixture.componentRef.setInput('prependIcon', 'dot-net');
    fixture.componentRef.setInput('href', 'https://dotnet.microsoft.com/');
    await fixture.whenStable();

    const anchor = (fixture.nativeElement as HTMLElement).querySelector('a.mes-chip');
    expect(anchor?.getAttribute('href')).toBe('https://dotnet.microsoft.com/');
    expect(anchor?.querySelector('.mdi-dot-net')).toBeTruthy();
  });
});
