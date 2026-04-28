/**
 * Rent Increase Rules Dataset Validator
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

const DATASET_NAME = "rentIncreaseRules";
const SCHEMA_PATH = "app/validation/RentIncreaseRulesSchema.ts";

async function main() {
  logStart("Rent Increase Rules Dataset Validator");

  const datasetPath = path.join(root, "app", "data", "us", "rentIncreaseRules.js");
  const data = await loadConfig(datasetPath, DATASET_NAME);
  validateConfig(data, DATASET_NAME);
  await validateWithZod(data, SCHEMA_PATH, "RentIncreaseRules");

  logSuccess("Rent Increase Rules dataset validated", Object.keys(data).length);
}

main().catch(logError);
