/**
 * Zod schema for the Canada provinces configuration.
 */

import { z } from "zod";

export const CAProvinceSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  accent: z.string().min(1),
  seal: z.string().optional(),
});

export const CAProvincesMapSchema = z.record(z.string(), CAProvinceSchema);
