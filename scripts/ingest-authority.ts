import fs from "fs";
import path from "path";
import { getDb, closeDb } from "../lib/authority/db";
import type { LegalAuthorityFile, LegalCitation, LegalVersion } from "../data/authority/schema";

const AUTHORITY_DIR = path.join(process.cwd(), "data", "authority", "us");

function deepMerge(base: any, override: any): any {
  if (Array.isArray(override)) {
    return override;
  }
  if (typeof override === "object" && override !== null) {
    const result: any = {};
    for (const key of Object.keys(base || {})) {
      result[key] = deepMerge(base[key], override[key] ?? base[key]);
    }
    for (const key of Object.keys(override || {})) {
      if (!(key in (base || {}))) {
        result[key] = override[key];
      }
    }
    return result;
  }
  return override !== undefined ? override : base;
}

function loadJsonFile(filePath: string): LegalAuthorityFile | null {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as LegalAuthorityFile;
}

function ingestAuthority() {
  const db = getDb();

  // Clear existing data
  db.exec(`DELETE FROM citations;`);
  db.exec(`DELETE FROM rules;`);
  db.exec(`DELETE FROM topics;`);
  db.exec(`DELETE FROM jurisdictions;`);

  const insertJurisdiction = db.prepare(`
    INSERT OR IGNORE INTO jurisdictions (country, state, city)
    VALUES (?, ?, ?)
  `);

  const insertTopic = db.prepare(`
    INSERT OR IGNORE INTO topics (name)
    VALUES (?)
  `);

  const insertRule = db.prepare(`
    INSERT INTO rules (jurisdiction_id, topic_id, data_json, version, effective_date, supersedes)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const insertCitation = db.prepare(`
    INSERT INTO citations (rule_id, statute, url, excerpt, source_type, last_updated, confidence)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const getJurisdictionId = db.prepare(`
    SELECT id FROM jurisdictions WHERE country = ? AND state = ? AND city IS ?
  `);

  const getTopicId = db.prepare(`
    SELECT id FROM topics WHERE name = ?
  `);

  if (!fs.existsSync(AUTHORITY_DIR)) {
    console.log("No authority data found.");
    return;
  }

  const stateDirs = fs.readdirSync(AUTHORITY_DIR).filter((d) => {
    const fullPath = path.join(AUTHORITY_DIR, d);
    return fs.statSync(fullPath).isDirectory() && d !== "schema.ts";
  });

  for (const state of stateDirs) {
    const statePath = path.join(AUTHORITY_DIR, state);
    const files = fs.readdirSync(statePath).filter((f) => f.endsWith(".json"));

    for (const file of files) {
      const baseFile = loadJsonFile(path.join(statePath, file));
      if (!baseFile) continue;

      const topic = baseFile.topic;
      const cityDirs = fs.readdirSync(statePath).filter((d) => {
        const fullPath = path.join(statePath, d);
        return fs.statSync(fullPath).isDirectory();
      });

      for (const city of cityDirs) {
        const overrideFilePath = path.join(statePath, city, `${topic}.override.json`);
        const overrideFile = loadJsonFile(overrideFilePath);

        let mergedFile = baseFile;
        if (overrideFile) {
          mergedFile = {
            ...baseFile,
            jurisdiction: overrideFile.jurisdiction,
            rule: {
              data: deepMerge(baseFile.rule.data, overrideFile.rule.data),
              citations: [...baseFile.rule.citations, ...overrideFile.rule.citations],
              version: overrideFile.rule.version,
            },
          };
        }

        // Insert jurisdiction
        const cityName = mergedFile.jurisdiction.city || null;
        insertJurisdiction.run(mergedFile.jurisdiction.country, mergedFile.jurisdiction.state, cityName);
        const jurisdictionRow = getJurisdictionId.get(
          mergedFile.jurisdiction.country,
          mergedFile.jurisdiction.state,
          cityName
        ) as { id: number };

        // Insert topic
        insertTopic.run(topic);
        const topicRow = getTopicId.get(topic) as { id: number };

        // Insert rule
        const ruleResult = insertRule.run(
          jurisdictionRow.id,
          topicRow.id,
          JSON.stringify(mergedFile.rule.data),
          mergedFile.rule.version.version,
          mergedFile.rule.version.effectiveDate,
          mergedFile.rule.version.supersedes
        );

        const ruleId = Number(ruleResult.lastInsertRowid);

        // Insert citations
        for (const citation of mergedFile.rule.citations) {
          insertCitation.run(
            ruleId,
            citation.statute,
            citation.url,
            citation.excerpt,
            citation.sourceType,
            citation.lastUpdated,
            citation.confidence
          );
        }
      }

      // Also insert state-level rule (no city override)
      const hasCityOverride = cityDirs.length > 0;
      if (!hasCityOverride) {
        insertJurisdiction.run(baseFile.jurisdiction.country, baseFile.jurisdiction.state, null);
        const jurisdictionRow = getJurisdictionId.get(
          baseFile.jurisdiction.country,
          baseFile.jurisdiction.state,
          null
        ) as { id: number };

        insertTopic.run(topic);
        const topicRow = getTopicId.get(topic) as { id: number };

        const ruleResult = insertRule.run(
          jurisdictionRow.id,
          topicRow.id,
          JSON.stringify(baseFile.rule.data),
          baseFile.rule.version.version,
          baseFile.rule.version.effectiveDate,
          baseFile.rule.version.supersedes
        );

        const ruleId = Number(ruleResult.lastInsertRowid);

        for (const citation of baseFile.rule.citations) {
          insertCitation.run(
            ruleId,
            citation.statute,
            citation.url,
            citation.excerpt,
            citation.sourceType,
            citation.lastUpdated,
            citation.confidence
          );
        }
      }
    }
  }

  console.log("Authority ingestion complete.");
}

ingestAuthority();
closeDb();
