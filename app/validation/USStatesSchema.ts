/**
 * Zod schema for the US states configuration.
 */

import { z } from "zod";

export const USStateSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  accent: z.string().min(1),
  seal: z.string().optional(),
});

export const USStatesMapSchema = z.record(z.string(), USStateSchema);
