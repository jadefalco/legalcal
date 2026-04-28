/**
 * Lease Termination Rules Dataset Validator
 */

import path from "path";
import {
  resolveRoot,
  loadConfig,
  validateConfig,
  validateWithZod,
  logStart,
  logSuccess,
  logError,
} from "./lib/generator-utils.mjs";

const root = resolveRoot();

const DATASET_NAME = "leaseTerminationRules";
const SCHEMA_PATH = "app/validation/LeaseTerminationRulesSchema.ts";

async function main() {
  logStart("Lease Termination Rules Dataset Validator");

  const datasetPath = path.join(root, "app", "data", "us", "leaseTerminationRules.js");
  const data = await loadConfig(datasetPath, DATASET_NAME);
  validateConfig(data, DATASET_NAME);
  await validateWithZod(data, SCHEMA_PATH, "LeaseTerminationRules");

  logSuccess("Lease Termination Rules dataset validated", Object.keys(data).length);
}

main().catch(logError);
