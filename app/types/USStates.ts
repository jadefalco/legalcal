/**
 * TypeScript types for the US states configuration.
 */

export interface USState {
  name: string;
  slug: string;
  accent: string;
  seal?: string;
}

export type USStatesMap = Record<string, USState>;
