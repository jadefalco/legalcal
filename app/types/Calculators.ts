/**
 * TypeScript types for the calculators registry configuration.
 */

export interface Calculator {
  name: string;
  slug: string;
  description: string;
}

export type CalculatorsList = Calculator[];
