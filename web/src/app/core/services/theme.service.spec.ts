import { TestBed } from '@angular/core/testing';
import { THEME_STORAGE_KEY, ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark-theme', 'light-theme');
    document.documentElement.style.colorScheme = '';
    TestBed.configureTestingModule({});
  });

  it('should default to dark theme and synchronize document root classes', () => {
    const service = TestBed.inject(ThemeService);
    TestBed.tick();

    expect(service.themeMode()).toBe('dark');
    expect(service.isDark()).toBe(true);
    expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
    expect(document.documentElement.classList.contains('light-theme')).toBe(false);
    expect(document.documentElement.style.colorScheme).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('should toggle between dark and light themes and persist to localStorage', () => {
    const service = TestBed.inject(ThemeService);
    TestBed.tick();

    service.toggleTheme();
    TestBed.tick();

    expect(service.themeMode()).toBe('light');
    expect(service.isDark()).toBe(false);
    expect(document.documentElement.classList.contains('light-theme')).toBe(true);
    expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
    expect(document.documentElement.style.colorScheme).toBe('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');

    service.toggleTheme();
    TestBed.tick();

    expect(service.themeMode()).toBe('dark');
    expect(service.isDark()).toBe(true);
    expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('should initialize from persisted localStorage theme when valid', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light');

    const service = TestBed.inject(ThemeService);
    TestBed.tick();

    expect(service.themeMode()).toBe('light');
    expect(service.isDark()).toBe(false);
    expect(document.documentElement.classList.contains('light-theme')).toBe(true);
  });
});
