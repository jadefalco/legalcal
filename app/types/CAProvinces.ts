/**
 * TypeScript types for the Canada provinces configuration.
 */

export interface CAProvince {
  name: string;
  slug: string;
  accent: string;
  seal?: string;
}

export type CAProvincesMap = Record<string, CAProvince>;
