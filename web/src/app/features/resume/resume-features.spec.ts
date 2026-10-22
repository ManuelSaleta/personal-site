import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AboutMePageComponent } from '../about/about-me-page.component';
import { BooksPageComponent } from '../books/books-page.component';
import { HomePageComponent } from '../home/home-page.component';
import { PoemsPageComponent } from '../poems/poems-page.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { ResumeAboutComponent } from './resume-about/resume-about.component';
import { ResumeBaseComponent } from './resume-base/resume-base.component';
import { ResumeSectionComponent } from './resume-section/resume-section.component';
import { SkillsListComponent } from './skills-list/skills-list.component';

describe('Resume Feature Components & Secondary Pages', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactInfoComponent,
        ResumeAboutComponent,
        ResumeSectionComponent,
        ResumeBaseComponent,
        SkillsListComponent,
        HomePageComponent,
        PoemsPageComponent,
        BooksPageComponent,
        AboutMePageComponent,
      ],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('ContactInfoComponent should render contact & social pill links', async () => {
    const fixture = TestBed.createComponent(ContactInfoComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance.contactLinks().length).toBe(5);
    const links = (fixture.nativeElement as HTMLElement).querySelectorAll('a.mes-chip');
    expect(links.length).toBe(5);
  });

  it('ResumeSectionComponent should parse company/period and detect tech stack keywords', async () => {
    const fixture = TestBed.createComponent(ResumeSectionComponent);
    fixture.componentRef.setInput('heading', 'STAFF SOFTWARE ENGINEER');
    fixture.componentRef.setInput('subHeading', 'SEABOARD MARINE | 08/2026 - PRESENT');
    fixture.componentRef.setInput('contributions', [
      'Engineered modular-monolith APIs in .NET 10 and C# with Dapper and Angular Signals.',
    ]);
    await fixture.whenStable();

    const instance = fixture.componentInstance;
    expect(instance.parsedMeta()).toEqual({
      company: 'SEABOARD MARINE',
      period: '08/2026 - PRESENT',
    });
    expect(instance.displayedTechs()).toEqual(
      expect.arrayContaining(['.NET 10', 'C#', 'Angular', 'Dapper']),
    );
  });

  it('ResumeBaseComponent should switch between timeline and cards grid and pulse edge glow', async () => {
    const fixture = TestBed.createComponent(ResumeBaseComponent);
    const instance = fixture.componentInstance;
    await fixture.whenStable();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('[data-testid="resume-timeline-view"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="resume-cards-grid"]')).toBeNull();

    instance.viewMode.set('cards');
    await fixture.whenStable();
    expect(el.querySelector('[data-testid="resume-cards-grid"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="resume-timeline-view"]')).toBeNull();

    instance.triggerHit('right');
    expect(instance.hitRight()).toBe(true);
    expect(instance.parsePeriod('BITSTOP | 06/2021-2024')).toBe('06/2021-2024');
  });

  it('HomePageComponent, SkillsListComponent, PoemsPageComponent, BooksPageComponent, and AboutMePageComponent should render cleanly', async () => {
    const homeFixture = TestBed.createComponent(HomePageComponent);
    await homeFixture.whenStable();
    const homeEl = homeFixture.nativeElement as HTMLElement;
    expect(homeEl.querySelector('[data-testid="resume-about-card"]')).toBeTruthy();
    expect(homeEl.querySelector('[data-testid="resume-base-container"]')).toBeTruthy();
    expect(homeEl.querySelector('[data-testid="skills-list-card"]')).toBeTruthy();

    const poemsFixture = TestBed.createComponent(PoemsPageComponent);
    await poemsFixture.whenStable();
    expect(
      (poemsFixture.nativeElement as HTMLElement).querySelector(
        '[data-testid="poems-page-container"]',
      ),
    ).toBeTruthy();

    const booksFixture = TestBed.createComponent(BooksPageComponent);
    await booksFixture.whenStable();
    expect(
      (booksFixture.nativeElement as HTMLElement).querySelectorAll('[data-testid="book-card"]')
        .length,
    ).toBe(2);

    const aboutFixture = TestBed.createComponent(AboutMePageComponent);
    await aboutFixture.whenStable();
    expect(
      (aboutFixture.nativeElement as HTMLElement).querySelector('[data-testid="about-me-page"]'),
    ).toBeTruthy();
  });
});
