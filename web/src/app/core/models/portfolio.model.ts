/**
 * Represents a career experience entry displayed on the resume timeline and card grid.
 */
export interface ExperienceItem {
  /** Unique numeric identifier ordering the experience entry. */
  readonly id: number;
  /** Primary role or section title (e.g., `STAFF SOFTWARE ENGINEER`). */
  readonly heading: string;
  /** Company name and date range subtitle (e.g., `SEABOARD MARINE | 08/2026 - PRESENT`). */
  readonly sub_heading: string;
  /** Bullet-point engineering accomplishments and technical contributions. */
  readonly contributions: readonly string[];
}

/**
 * Shape of the static `src/assets/resume.json` document.
 */
export interface ResumeDocument {
  /** Ordered list of career experience entries. */
  readonly experience: readonly ExperienceItem[];
}

/**
 * Represents a technical skill badge with brand hex color, documentation URL, and MDI icon name.
 */
export interface SkillItem {
  /** Display label for the technology or competency. */
  readonly name: string;
  /** Brand hex color (e.g., `#512BD4`). */
  readonly color: string;
  /** External documentation or reference URL. */
  readonly url: string;
  /** Material Design Icons suffix without the `mdi-` prefix (e.g., `dot-net`, `angular`). */
  readonly icon: string;
}

/**
 * Shape of the static `src/assets/skills.json` document.
 */
export interface SkillsDocument {
  /** Curated list of technical skills and competencies. */
  readonly skills: readonly SkillItem[];
}

/**
 * Represents a "Slice of Life" poem entry returned by the portfolio API or local factory.
 */
export interface Poem {
  /** Sequential poem number (`#1`, `#2`, ...). */
  readonly number: number;
  /** Poem title. */
  readonly title: string;
  /** Multi-line poem body text preserving line breaks. */
  readonly body: string;
  /** Optional ISO-8601 timestamp when the poem was last updated. */
  readonly updated_at?: string;
}

/**
 * Represents a top-level navigation destination in the application header and mobile drawer.
 */
export interface NavigationLink {
  /** Human-readable link label. */
  readonly label: string;
  /** Router path target (e.g., `'/'`, `'/store'`). */
  readonly to: string;
  /** Full Material Design Icons class name (e.g., `'mdi-home-outline'`). */
  readonly icon: string;
  /** Whether active route matching should require an exact path match. */
  readonly exact: boolean;
}
