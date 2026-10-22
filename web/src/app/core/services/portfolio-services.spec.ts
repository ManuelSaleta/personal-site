import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppNavigationComponent } from '../layout/app-navigation/app-navigation.component';
import { poemFactory } from '../mocks/poem-factory';
import { PoemsService } from './poems.service';
import { ResumeService } from './resume.service';
import { ThemeService } from './theme.service';

describe('Core Portfolio Signal Services & AppNavigationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppNavigationComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('ResumeService should expose typed experience and skills signals from JSON assets', () => {
    const resumeService = TestBed.inject(ResumeService);
    expect(resumeService.experience().length).toBeGreaterThanOrEqual(7);
    expect(resumeService.experienceCount()).toBe(resumeService.experience().length);
    expect(resumeService.skills().length).toBeGreaterThan(20);
    expect(resumeService.skillsCount()).toBe(resumeService.skills().length);
    expect(resumeService.resumePdfUrl()).toBe('/assets/manuel_saleta_resume.pdf');
  });

  it('poemFactory should generate the requested number of deterministic poems', () => {
    const poems = poemFactory(20);
    expect(poems.length).toBe(20);
    expect(poems[0]?.number).toBe(1);
    expect(poems[19]?.number).toBe(20);
    expect(poems[0]?.title.length).toBeGreaterThan(0);
  });

  it('PoemsService should load poems via its Signal resource()', async () => {
    const poemsService = TestBed.inject(PoemsService);
    await TestBed.inject(PoemsService).poemsResource.reload();
    await new Promise((resolve) => setTimeout(resolve, 25));
    expect(poemsService.poems().length).toBe(20);
  });

  it('AppNavigationComponent should toggle the mobile drawer and delegate theme toggling', async () => {
    const fixture = TestBed.createComponent(AppNavigationComponent);
    const component = fixture.componentInstance;
    const themeService = TestBed.inject(ThemeService);
    const initialDark = themeService.isDark();

    await fixture.whenStable();
    expect(component.drawerOpened()).toBe(false);

    component.toggleDrawer();
    await fixture.whenStable();
    expect(component.drawerOpened()).toBe(true);

    component.closeDrawer();
    await fixture.whenStable();
    expect(component.drawerOpened()).toBe(false);

    const themeBtn = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '[data-testid="nav-theme-toggle-btn"]',
    );
    themeBtn?.click();
    expect(themeService.isDark()).toBe(!initialDark);
  });
});
