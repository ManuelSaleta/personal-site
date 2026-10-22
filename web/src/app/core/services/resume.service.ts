import { computed, Service, signal } from '@angular/core';
import resumeJson from '../../../assets/resume.json';
import skillsJson from '../../../assets/skills.json';
import type {
  ExperienceItem,
  ResumeDocument,
  SkillItem,
  SkillsDocument,
} from '../models/portfolio.model';

const TYPED_RESUME = resumeJson as ResumeDocument;
const TYPED_SKILLS = skillsJson as SkillsDocument;

/**
 * Singleton Signal service providing typed access to career experience, technical skills,
 * and static portfolio asset paths.
 *
 * @remarks
 * Uses the Angular v22+ `@Service()` decorator (`providedIn: 'root'` by default) and exposes
 * read-only signals backed by `src/assets/resume.json` and `src/assets/skills.json`.
 */
@Service()
export class ResumeService {
  private readonly experienceSignal = signal<readonly ExperienceItem[]>(TYPED_RESUME.experience);
  private readonly skillsSignal = signal<readonly SkillItem[]>(TYPED_SKILLS.skills);

  /**
   * Read-only signal of ordered career experience entries.
   */
  public readonly experience = this.experienceSignal.asReadonly();

  /**
   * Read-only signal of technical skills with brand colors, icons, and documentation links.
   */
  public readonly skills = this.skillsSignal.asReadonly();

  /**
   * Computed total count of career experience sections.
   */
  public readonly experienceCount = computed<number>(() => this.experienceSignal().length);

  /**
   * Computed total count of technical skills.
   */
  public readonly skillsCount = computed<number>(() => this.skillsSignal().length);

  /**
   * Static asset path to the downloadable Resume PDF.
   */
  public readonly resumePdfUrl = signal<string>('/assets/manuel_saleta_resume.pdf').asReadonly();

  /**
   * Static asset path to the profile avatar image.
   */
  public readonly avatarUrl = signal<string>('/assets/avatar.jpeg').asReadonly();
}
