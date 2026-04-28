/**
 * Zod schema for the calculators registry configuration.
 */

import { z } from "zod";

export const CalculatorSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
});

export const CalculatorsSchema = z.array(CalculatorSchema);
