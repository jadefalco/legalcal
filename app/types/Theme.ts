/**
 * Theme system for LegalCals state/province identity.
 */

export interface ThemeColors {
  /** Primary brand color (hex) */
  primary: string;
  /** Accent color for highlights (hex) */
  accent: string;
  /** Background tint color (hex) */
  background: string;
}

export interface Theme {
  /** Color palette */
  colors: ThemeColors;
  /** Path to emblem image */
  emblem: string;
  /** Tailwind gradient classes */
  gradient: string;
}

/** Map of region codes to themes */
export type ThemeMap = Record<string, Theme>;
