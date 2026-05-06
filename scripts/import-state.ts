import {
  createImportJob,
  updateImportJob,
  finishImportJob,
  logImportAction,
  getOrCreateJurisdiction,
  getOrCreateTopic,
  addToResearchQueue,
  closeDb,
} from "../lib/authority/db";
import { scrapeStateStatutes } from "../lib/authority/import/scrapeState";
import { classifyTopic } from "../lib/authority/import/classifyTopic";
import { generateRuleFromStatute } from "../lib/authority/import/generateRule";

async function runImport(state: string): Promise<void> {
  const jobId = await createImportJob(state);
  await updateImportJob(jobId, { status: "running" });

  try {
    const statutes = await scrapeStateStatutes(state);
    console.log(`Scraped ${statutes.length} statute pages for ${state.toUpperCase()}`);

    let classifiedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    let queuedCount = 0;

    const jurisdictionId = await getOrCreateJurisdiction("us", state.toLowerCase(), null);

    for (const statute of statutes) {
      const topic = classifyTopic(statute.text);

      if (!topic) {
        skippedCount++;
        await logImportAction(
          jobId,
          statute.url,
          null,
          "skipped",
          `No topic match for: ${statute.title}`
        );
        continue;
      }

      classifiedCount++;
      await logImportAction(
        jobId,
        statute.url,
        topic,
        "classified",
        `Matched topic "${topic}" for: ${statute.title}`
      );

      try {
        const rule = await generateRuleFromStatute(statute.text);
        const topicId = await getOrCreateTopic(topic);
        const notes = JSON.stringify(
          {
            importSource: statute.url,
            importTitle: statute.title,
            generatedRule: rule.data,
            generatedCitations: rule.citations,
            generatedNotes: rule.notes,
          },
          null,
          2
        );

        await addToResearchQueue(jurisdictionId, topicId, notes);
        queuedCount++;
        await logImportAction(
          jobId,
          statute.url,
          topic,
          "queued",
          `Added to research queue for topic "${topic}"`
        );
      } catch (err) {
        errorCount++;
        const message = err instanceof Error ? err.message : String(err);
        await logImportAction(
          jobId,
          statute.url,
          topic,
          "error",
          `Rule generation failed: ${message}`
        );
      }
    }

    await finishImportJob(jobId);
    console.log(`Import complete for ${state.toUpperCase()}`);
    console.log(`  Classified: ${classifiedCount}`);
    console.log(`  Queued:     ${queuedCount}`);
    console.log(`  Skipped:    ${skippedCount}`);
    console.log(`  Errors:     ${errorCount}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await updateImportJob(jobId, { status: "error", errorMessage: message });
    console.error(`Import failed for ${state.toUpperCase()}: ${message}`);
    process.exitCode = 1;
  } finally {
    closeDb();
  }
}

const state = process.argv[2];
if (!state) {
  console.error("Usage: npx tsx scripts/import-state.ts <state-slug>");
  console.error("Example: npx tsx scripts/import-state.ts ca");
  process.exit(1);
}

runImport(state);
